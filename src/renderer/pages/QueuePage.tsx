import { Clock, Copy, Dices, Search, Shuffle, Swords, Users, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import type { CivilizationMode } from "../../shared/contracts/matchmaking";
import { ThemedSelect } from "../components/common/ThemedSelect";
import { LobbyPreparation } from "../components/match/LobbyPreparation";
import { ActiveMatch } from "../components/match/ActiveMatch";
import { ResultScreen } from "../components/match/ResultScreen";
import { YouTubeShorts } from "../components/match/YouTubeShorts";
import { MapPool } from "../components/common/MapPool";
import { useAppStore } from "../state/appStore";

const favoriteMapsKey = "empire-league-favorite-maps";
const civilizationPreferenceKey = "empire-league-civilization-preference";

const civilizations = [
  "Armenians", "Aztecs", "Bengalis", "Berbers", "Bohemians", "Britons", "Bulgarians",
  "Burgundians", "Burmese", "Byzantines", "Celts", "Chinese", "Cumans", "Dravidians",
  "Ethiopians", "Franks", "Georgians", "Goths", "Gurjaras", "Hindustanis", "Huns",
  "Incas", "Italians", "Japanese", "Jurchens", "Khitans", "Khmer", "Koreans",
  "Lithuanians", "Magyars", "Malay", "Malians", "Mayans", "Mongols", "Persians",
  "Poles", "Portuguese", "Romans", "Saracens", "Sicilians", "Slavs", "Spanish",
  "Tatars", "Teutons", "Turks", "Vietnamese", "Vikings"
];

const civilizationModes: Array<{
  id: CivilizationMode;
  label: string;
  detail: string;
  icon: typeof Swords;
}> = [
  { id: "pick", label: "Choose Civ", detail: "Play your selected civilization", icon: Swords },
  { id: "random", label: "Random", detail: "Choose any civilization; duplicates are allowed", icon: Shuffle },
  { id: "mirror", label: "Mirror", detail: "Match your opponent's civilization", icon: Copy },
  { id: "full-random", label: "Full Random", detail: "Choose randomly without duplicating another player's civilization", icon: Dices }
];

export function QueuePage() {
  const { state, queues, startQueue, updateActiveQueue, cancelQueue, clearError } = useAppStore();
  const [elapsed, setElapsed] = useState(0);
  const [selectedQueueId, setSelectedQueueId] = useState(() => queues[0]?.id ?? "");
  const selectedQueue = queues.find((queue) => queue.id === selectedQueueId) ?? queues[0];
  const canStartQueue = ["idle", "cancelled", "completed"].includes(state.queueStatus)
    && (!state.activeMatch || state.queueStatus === "completed")
    && state.gameStatus !== "loading";
  const isSearching = state.queueStatus === "searching";
  const preferencesLocked = !["idle", "cancelled", "completed", "searching"].includes(state.queueStatus);
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
  const [civilizationMode, setCivilizationMode] = useState<CivilizationMode>(() => {
    try {
      const savedMode = JSON.parse(window.localStorage.getItem(civilizationPreferenceKey) ?? "{}").mode;
      return savedMode === "prefer-random" ? "random" : savedMode ?? "pick";
    } catch {
      return "pick";
    }
  });
  const [civilization, setCivilization] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(civilizationPreferenceKey) ?? "{}").civilization ?? "Byzantines";
    } catch {
      return "Byzantines";
    }
  });

  const selectCivilizationMode = (mode: CivilizationMode) => {
    setCivilizationMode(mode);
    window.localStorage.setItem(civilizationPreferenceKey, JSON.stringify({ mode, civilization }));
  };

  const selectCivilization = (value: string) => {
    setCivilization(value);
    window.localStorage.setItem(civilizationPreferenceKey, JSON.stringify({ mode: civilizationMode, civilization: value }));
  };

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
      if (removing && queueMaps.length === 1) return current;
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

  useEffect(() => {
    if (!isSearching || !selectedQueue) return;
    const timer = window.setTimeout(() => {
      void updateActiveQueue({
        ...selectedQueue,
        mapPool: selectedQueue.mapPool.filter((map) => selectedMaps[selectedQueue.id]?.includes(map.id)),
        favoriteMapId: favoriteMaps[selectedQueue.id],
        civilizationPreference: {
          mode: civilizationMode,
          civilization: civilizationMode === "pick" ? civilization : undefined
        }
      });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [civilization, civilizationMode, favoriteMaps, isSearching, selectedMaps, selectedQueue]);

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
    <section className="stack queue-page">
      {state.error && (
        <div className="error-panel">
          <strong>{state.error.message}</strong>
          <span>{state.error.technicalDetails}</span>
          <button type="button" onClick={clearError}>Dismiss</button>
        </div>
      )}
      {selectedQueue && (
        <div className="search-waiting-layout matchmaking-overview">
          <div className="search-state">
            {isSearching ? (
              <>
                <div className="search-orbit"><Search size={34} /></div>
                <h2>Searching for an opponent</h2>
                <div className="metrics-grid compact">
                  <div><span>Your rating</span><strong>{state.currentUser.rating}</strong></div>
                  <div><span>Current search range</span><strong>{state.searchRange.min}-{state.searchRange.max}</strong></div>
                  <div><span>Time searching</span><strong>{formatTime(elapsed)}</strong></div>
                  <div><span>Estimated wait</span><strong>{state.selectedQueue?.estimatedWaitSeconds}s</strong></div>
                </div>
                <p>Rating range expands automatically. Civilization and map changes below update your active search.</p>
                <button className="secondary" type="button" onClick={() => void cancelQueue()}>
                  <XCircle size={18} /> Cancel Search
                </button>
              </>
            ) : (
              <>
                <h2>{selectedQueue.name}</h2>
                <div className="queue-stats">
                  <span><Search size={18} /><strong>{selectedQueue.playersSearching}</strong> searching</span>
                  <span><Clock size={18} /><strong>~{selectedQueue.estimatedWaitSeconds}s</strong> wait</span>
                </div>
                <div className="queue-summary">
                  <div><span>Civilization</span><strong>{civilizationMode === "pick"
                    ? civilization
                    : civilizationModes.find((mode) => mode.id === civilizationMode)?.label}</strong></div>
                  <div><span>Maps enabled</span><strong>{selectedMaps[selectedQueue.id]?.length ?? 0}</strong></div>
                  <div><span>Preferred map</span><strong>{selectedQueue.mapPool.find((map) => map.id === favoriteMaps[selectedQueue.id])?.name ?? "None"}</strong></div>
                </div>
                <button
                  className="queue-search-button"
                  type="button"
                  disabled={!canStartQueue || (selectedMaps[selectedQueue.id]?.length ?? 0) === 0}
                  onClick={() => void startQueue({
                    ...selectedQueue,
                    mapPool: selectedQueue.mapPool.filter((map) => selectedMaps[selectedQueue.id]?.includes(map.id)),
                    favoriteMapId: favoriteMaps[selectedQueue.id],
                    civilizationPreference: {
                      mode: civilizationMode,
                      civilization: civilizationMode === "pick" ? civilization : undefined
                    }
                  })}
                >
                  <Search size={22} /> {state.gameStatus === "loading" ? "Loading AoE2…" : "Find Match"}
                </button>
              </>
            )}
          </div>
          <YouTubeShorts />
        </div>
      )}
      {selectedQueue ? (
        <>
          <div className="play-config-layout matchmaking-preferences">
            <article className="queue-card play-preferences" key={selectedQueue.id}>
              <div className="preference-section match-type-section">
                <span className="eyebrow">Match type</span>
                <div className="match-type-options">
                  {queues.map((queue) => {
                    const isTeamGame = queue.id === "team-games";
                    const Icon = isTeamGame ? Users : Swords;
                    return (
                      <button
                        className={selectedQueue.id === queue.id ? "civilization-mode active" : "civilization-mode"}
                        type="button"
                        key={queue.id}
                        aria-pressed={selectedQueue.id === queue.id}
                        disabled={isSearching || preferencesLocked}
                        onClick={() => setSelectedQueueId(queue.id)}
                      >
                        <Icon size={20} />
                        <span>
                          <strong>{isTeamGame ? "Team vs Team" : "1v1"}</strong>
                          <small>{queue.ruleset}</small>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="preference-section">
                <div className="preference-heading civilization-preference-heading">
                  <div>
                    <span className="eyebrow">Civilization</span>
                  </div>
                </div>
                <div className="civilization-modes">
                  {civilizationModes.map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <div
                        className={civilizationMode === mode.id ? "civilization-option-card active" : "civilization-option-card"}
                        key={mode.id}
                      >
                        <button
                          className="civilization-mode-choice"
                          type="button"
                          aria-pressed={civilizationMode === mode.id}
                          disabled={preferencesLocked}
                          onClick={() => selectCivilizationMode(mode.id)}
                        >
                          <Icon size={20} />
                          <span>
                            <strong>{mode.label}</strong>
                            {mode.detail && <small>{mode.detail}</small>}
                          </span>
                        </button>
                        {mode.id === "pick" && (
                          <ThemedSelect
                            className="civilization-select"
                            label="Civilization"
                            options={civilizations.map((name) => ({ value: name, label: name }))}
                            value={civilization}
                            onChange={selectCivilization}
                            disabled={preferencesLocked || civilizationMode !== "pick"}
                            searchable
                            displayValue={civilizationMode === "pick" ? undefined : "N/A"}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="preference-section map-preference-section">
                <div className="preference-heading">
                  <div>
                    <span className="eyebrow">Map pool</span>
                  </div>
                  <span className="selection-count">
                    {selectedMaps[selectedQueue.id]?.length ?? 0} of {selectedQueue.mapPool.length} enabled
                  </span>
                </div>
                <MapPool
                  maps={selectedQueue.mapPool}
                  selectedMapIds={selectedMaps[selectedQueue.id] ?? []}
                  onToggle={(mapId) => toggleMap(selectedQueue.id, mapId)}
                  favoriteMapId={favoriteMaps[selectedQueue.id]}
                  onFavorite={(mapId) => toggleFavorite(selectedQueue.id, mapId)}
                  disabled={preferencesLocked}
                />
              </div>
            </article>
            {false && <aside className="queue-card queue-action-panel">
              <h2>{selectedQueue.name}</h2>
              <div className="queue-stats">
                <span><Search size={18} /><strong>{selectedQueue.playersSearching}</strong> searching</span>
                <span><Clock size={18} /><strong>~{selectedQueue.estimatedWaitSeconds}s</strong> wait</span>
              </div>
              <div className="queue-summary">
                <div>
                  <span>Civilization</span>
                  <strong>
                    {civilizationMode === "pick"
                      ? civilization
                      : civilizationModes.find((mode) => mode.id === civilizationMode)?.label}
                  </strong>
                </div>
                <div><span>Maps enabled</span><strong>{selectedMaps[selectedQueue.id]?.length ?? 0}</strong></div>
                <div><span>Preferred map</span><strong>{selectedQueue.mapPool.find((map) => map.id === favoriteMaps[selectedQueue.id])?.name ?? "None"}</strong></div>
              </div>
              <button
                  className="queue-search-button"
                  type="button"
                  disabled={!canStartQueue || (selectedMaps[selectedQueue.id]?.length ?? 0) === 0}
                  onClick={() => void startQueue({
                    ...selectedQueue,
                    mapPool: selectedQueue.mapPool.filter((map) => selectedMaps[selectedQueue.id]?.includes(map.id)),
                    favoriteMapId: favoriteMaps[selectedQueue.id],
                    civilizationPreference: {
                      mode: civilizationMode,
                      civilization: civilizationMode === "pick"
                        ? civilization
                        : undefined
                    }
                  })}
                >
                  <Search size={22} /> {state.gameStatus === "loading" ? "Loading AoE2…" : "Find Match"}
              </button>
            </aside>}
          </div>
        </>
      ) : (
        <div className="empty-state">No matchmaking modes are available.</div>
      )}
    </section>
  );
}

function formatTime(seconds: number): string {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}
