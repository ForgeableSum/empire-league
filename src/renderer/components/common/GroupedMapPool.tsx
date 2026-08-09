import { Star } from "lucide-react";
import { useState } from "react";
import type { MapGroupId } from "../../../shared/contracts/matchmaking";
import type { RenderedMapGroupDefinition } from "../../mocks/mockPlayers";
import { isPreviewMode } from "../../previewMode";
import { useAppStore } from "../../state/appStore";

const mapGuidanceTargetId = "arena";
const mapGuidanceSeenKey = "empire-league-map-guidance-seen";

function shouldShowMapGuidance(): boolean {
  if (isPreviewMode) return true;
  try {
    return window.localStorage.getItem(mapGuidanceSeenKey) !== "1";
  } catch {
    return true;
  }
}

interface GroupedMapPoolProps {
  groups: RenderedMapGroupDefinition[];
  enabledGroupIds: MapGroupId[];
  selectedMapIds: string[];
  favoriteMapIds: Partial<Record<MapGroupId, string>>;
  onToggleGroup: (groupId: MapGroupId) => void;
  onToggleMap: (groupId: MapGroupId, mapId: string) => void;
  onFavorite: (groupId: MapGroupId, mapId: string) => void;
  disabled?: boolean;
}

export function GroupedMapPool({
  groups,
  enabledGroupIds,
  selectedMapIds,
  favoriteMapIds,
  onToggleGroup,
  onToggleMap,
  onFavorite,
  disabled = false
}: GroupedMapPoolProps) {
  const { localizeAoe2Name } = useAppStore();
  const [showMapGuidance, setShowMapGuidance] = useState(shouldShowMapGuidance);

  function dismissMapGuidance() {
    setShowMapGuidance(false);
    if (isPreviewMode) return;
    try {
      window.localStorage.setItem(mapGuidanceSeenKey, "1");
    } catch {
      // Storage may be unavailable; dismiss the cue for the current session.
    }
  }

  return (
    <div className="grouped-map-pool">
      {groups.map((group) => {
        const groupEnabled = enabledGroupIds.includes(group.id);
        const containsPreviewTarget = group.maps.some((map) => map.id === mapGuidanceTargetId);
        return (
          <section className={`${groupEnabled ? "map-group enabled" : "map-group"}${showMapGuidance && containsPreviewTarget ? " map-guidance-active" : ""}`} key={group.id}>
            <header className="map-group-header">
              <div>
                <strong>{group.name}</strong>
                <span>{group.description}</span>
              </div>
              <label className="group-switch">
                <input
                  type="checkbox"
                  checked={groupEnabled}
                  disabled={disabled}
                  onChange={() => onToggleGroup(group.id)}
                />
                <span aria-hidden="true" />
                <small>{groupEnabled ? "Enabled" : "Disabled"}</small>
              </label>
            </header>
            <div className="map-group-grid">
              {group.maps.map((map, index) => {
                const mapName = localizeAoe2Name(map.name);
                const primary = map.id === group.primaryMapId;
                const selected = groupEnabled && selectedMapIds.includes(map.id);
                const favorite = favoriteMapIds[group.id] === map.id;
                return (
                  <article
                    className={`group-map ${primary ? "primary" : ""} ${selected ? "selected" : ""}${showMapGuidance && map.id === mapGuidanceTargetId ? " map-guidance-target" : ""}`}
                    key={map.id}
                  >
                    <button
                      className="group-map-select"
                      type="button"
                      aria-pressed={selected}
                      aria-label={`${selected ? "Exclude" : "Include"} ${mapName}`}
                      disabled={disabled || !groupEnabled}
                      onClick={() => {
                        dismissMapGuidance();
                        onToggleMap(group.id, map.id);
                      }}
                    >
                      <img src={map.thumbnailUrl} alt="" />
                      <span className="group-map-shade" />
                      <span className="group-map-name">
                        <strong>{mapName}</strong>
                        {primary && <small>Primary map</small>}
                      </span>
                      {!selected && <span className="map-off-label">{groupEnabled ? "Off" : "Group off"}</span>}
                    </button>
                    <button
                      className={favorite ? "map-favorite active" : "map-favorite"}
                      type="button"
                      disabled={disabled || !groupEnabled}
                      aria-pressed={favorite}
                      aria-label={`${favorite ? "Remove" : "Favorite"} ${mapName}`}
                      title={favorite ? "Remove favorite" : `Favorite ${mapName}`}
                      onClick={() => onFavorite(group.id, map.id)}
                    >
                      <Star size={index === 0 ? 18 : 15} fill={favorite ? "currentColor" : "none"} />
                    </button>
                  </article>
                );
              })}
            </div>
            {showMapGuidance && containsPreviewTarget && (
              <span className="map-guidance-cue" aria-hidden="true">
                Click a map to enable or disable it
              </span>
            )}
          </section>
        );
      })}
    </div>
  );
}
