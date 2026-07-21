import type { MapDefinition } from "../../../shared/contracts/matchmaking";

interface MapPoolProps {
  maps: MapDefinition[];
  limit?: number;
  selectedMapIds?: string[];
  onToggle?: (mapId: string) => void;
}

export function MapPool({ maps, limit, selectedMapIds, onToggle }: MapPoolProps) {
  const visibleMaps = limit === undefined ? maps : maps.slice(0, limit);
  const selectable = selectedMapIds !== undefined && onToggle !== undefined;

  return (
    <div className="map-pool">
      {visibleMaps.map((map) => {
        const selected = !selectable || selectedMapIds.includes(map.id);
        const content = (
          <>
            <img src={map.thumbnailUrl} alt="" />
            {selectable && <span className="map-check" aria-hidden="true">{selected ? "✓" : ""}</span>}
            <span className="map-name">{map.name}</span>
          </>
        );

        return selectable ? (
          <button
            className={selected ? "map-thumbnail selected" : "map-thumbnail"}
            type="button"
            aria-pressed={selected}
            aria-label={`${selected ? "Exclude" : "Include"} ${map.name}`}
            onClick={() => onToggle(map.id)}
            key={map.id}
          >
            {content}
          </button>
        ) : (
          <figure className="map-thumbnail selected" key={map.id}>
            {content}
          </figure>
        );
      })}
    </div>
  );
}
