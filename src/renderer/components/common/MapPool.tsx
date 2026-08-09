import { Star } from "lucide-react";
import type { MapDefinition } from "../../../shared/contracts/matchmaking";
import { useAppStore } from "../../state/appStore";

interface MapPoolProps {
  maps: MapDefinition[];
  limit?: number;
  selectedMapIds?: string[];
  onToggle?: (mapId: string) => void;
  favoriteMapId?: string;
  onFavorite?: (mapId: string) => void;
  disabled?: boolean;
}

export function MapPool({ maps, limit, selectedMapIds, onToggle, favoriteMapId, onFavorite, disabled = false }: MapPoolProps) {
  const { localizeAoe2Name } = useAppStore();
  const visibleMaps = limit === undefined ? maps : maps.slice(0, limit);
  const selectable = selectedMapIds !== undefined && onToggle !== undefined;

  return (
    <div className="map-pool">
      {visibleMaps.map((map) => {
        const mapName = localizeAoe2Name(map.name);
        const selected = !selectable || selectedMapIds.includes(map.id);
        const content = (
          <>
            <img src={map.thumbnailUrl} alt="" />
            <span className="map-name">{mapName}</span>
          </>
        );

        return selectable ? (
          <div className="map-thumbnail-wrap" key={map.id}>
            <button
              className={selected ? "map-thumbnail selected" : "map-thumbnail"}
              type="button"
              aria-pressed={selected}
              aria-label={`${selected ? "Exclude" : "Include"} ${mapName}`}
              disabled={disabled}
              onClick={() => onToggle(map.id)}
            >
              {content}
            </button>
            {onFavorite && (
              <button
                className={favoriteMapId === map.id ? "map-favorite active" : "map-favorite"}
                type="button"
                disabled={disabled}
                aria-pressed={favoriteMapId === map.id}
                aria-label={`${favoriteMapId === map.id ? "Remove" : "Favorite"} ${mapName}`}
                title={favoriteMapId === map.id ? "Remove favorite" : "Set as favorite"}
                onClick={() => onFavorite(map.id)}
              >
                <Star size={16} fill={favoriteMapId === map.id ? "currentColor" : "none"} />
              </button>
            )}
          </div>
        ) : (
          <figure className="map-thumbnail selected" key={map.id}>
            {content}
          </figure>
        );
      })}
    </div>
  );
}
