import { Clock, Search, ShieldCheck, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { LobbyPreparation } from "../components/match/LobbyPreparation";
import { ActiveMatch } from "../components/match/ActiveMatch";
import { ResultScreen } from "../components/match/ResultScreen";
import { MapPool } from "../components/common/MapPool";
import { useAppStore } from "../state/appStore";

const favoriteMapsKey = "empire-league-favorite-maps";

export function QueuePage() {
  const { state, queues, startQueue, cancelQueue, clearError } = useAppStore();
  const [elapsed, setElapsed] = useState(0);
  const canStartQueue = ["idle", "cancelled", "completed"].includes(state.queueStatus)
    && (!state.activeMatch || state.queueStatus === "completed")
    && state.gameStatus !== "loading";
  const [selectedMaps, setSelectedMaps] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(queues.map((queue) => [queue.id, queue.mapPool.map((map) => map.id)]))
  );
  const [favoriteMaps, setFavoriteMaps] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(window.localStorage.getItem(favoriteMapsKey) ?? "{}");
    } catch {
      return {};
    }
  });

  const toggleFavorite = (queueId: string, mapId: string) => {
    setFavoriteMaps((current) => {
      const next = { ...current };
      if (next[queueId] === mapId) delete next[queueId];
      else next[queueId] = mapId;
      window.localStorage.setItem(favoriteMapsKey, JSON.stringify(next));
      return next;
    });
  };

  const toggleMap = (queueId: string, mapId: string) => {
    if (selectedMaps[queueId]?.includes(mapId) && favoriteMaps[queueId] === mapId) {
      toggleFavorite(queueId, mapId);
    }
    setSelectedMaps((current) => {
      const queueMaps = current[queueId] ?? [];
      const removing = queueMaps.includes(mapId);
      return {
        ...current,
        [queueId]: removing
          ? queueMaps.filter((id) => id !== mapId)
          : [...queueMaps, mapId]
      };
    });
  };

  useEffect(() => {
    if (!state.queueStartedAt || state.queueStatus !== "searching") return;
    const timer = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - new Date(state.queueStartedAt ?? Date.now()).getTime()) / 1000));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [state.queueStartedAt, state.queueStatus]);

  if (["creating_lobby", "waiting_for_opponent", "verifying_lobby", "ready"].includes(state.queueStatus)) {
    return <LobbyPreparation />;
  }
  if (state.queueStatus === "in_game" || state.queueStatus === "verifying_result") {
    return <ActiveMatch />;
  }
  if (state.queueStatus === "completed") {
    return <ResultScreen />;
  }

  return (
    <section className="stack">
      {state.error && (
        <div className="error-panel">
          <strong>{state.error.message}</strong>
          <span>{state.error.technicalDetails}</span>
          <button type="button" onClick={clearError}>Dismiss</button>
        </div>
      )}
      {state.queueStatus === "searching" ? (
        <div className="search-state">
          <div className="search-orbit"><Search size={34} /></div>
          <h2>Searching for an opponent</h2>
          <div className="metrics-grid compact">
            <div><span>Your rating</span><strong>{state.currentUser.rating}</strong></div>
            <div><span>Current search range</span><strong>{state.searchRange.min}-{state.searchRange.max}</strong></div>
            <div><span>Time searching</span><strong>{formatTime(elapsed)}</strong></div>
            <div><span>Estimated wait</span><strong>{state.selectedQueue?.estimatedWaitSeconds}s</strong></div>
          </div>
          <p>Rating range expands automatically while preserving connection quality and map-pool compatibility.</p>
          <button className="secondary" type="button" onClick={() => void cancelQueue()}>
            <XCircle size={18} /> Cancel Search
          </button>
        </div>
      ) : (
        <div className="queue-grid">
          {queues.map((queue) => (
            <article className="queue-card" key={queue.id}>
              <div className="queue-heading">
                <ShieldCheck size={22} />
                <div>
                  <h2>{queue.name}</h2>
                  <span>{queue.ranked ? "Ranked" : "Prototype"}</span>
                </div>
              </div>
              <p>{queue.description}</p>
              <div className="queue-search-controls">
                <div className="queue-stats">
                  <span><Search size={16} /> {queue.playersSearching} searching</span>
                  <span><Clock size={16} /> {queue.estimatedWaitSeconds}s wait</span>
                </div>
                <MapPool
                  maps={queue.mapPool}
                  selectedMapIds={selectedMaps[queue.id] ?? []}
                  onToggle={(mapId) => toggleMap(queue.id, mapId)}
                  favoriteMapId={favoriteMaps[queue.id]}
                  onFavorite={(mapId) => toggleFavorite(queue.id, mapId)}
                />
                <button
                  className="secondary"
                  type="button"
                  disabled={!canStartQueue || (selectedMaps[queue.id]?.length ?? 0) === 0}
                  onClick={() => void startQueue({
                    ...queue,
                    mapPool: queue.mapPool.filter((map) => selectedMaps[queue.id]?.includes(map.id)),
                    favoriteMapId: favoriteMaps[queue.id]
                  })}
                >
                  <Search size={18} /> {state.gameStatus === "loading" ? "Loading AoE2…" : "Search"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function formatTime(seconds: number): string {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}
