import { CircleHelp, Clock, Copy, Search, Settings, Shuffle, Swords, Users, XCircle } from "lucide-react";
import { useEffect, useId, useMemo, useState } from "react";
import type { CivilizationMode, MapGroupId } from "../../shared/contracts/matchmaking";
import { classicCivilizations, civilizations } from "../../shared/civilizations";
import { mapCatalog } from "../../shared/mapCatalog";
import { ThemedSelect } from "../components/common/ThemedSelect";
import { LobbyPreparation } from "../components/match/LobbyPreparation";
import { ActiveMatch } from "../components/match/ActiveMatch";
import { ResultScreen } from "../components/match/ResultScreen";
import { MatchmakingBrand } from "../components/match/MatchmakingBrand";
import { GroupedMapPool } from "../components/common/GroupedMapPool";
import { mapGroups } from "../mocks/mockPlayers";
import { isPreviewMode, previewSection } from "../previewMode";
import { useAppStore } from "../state/appStore";

const favoriteMapsKey = "empire-league-favorite-maps";
const civilizationPreferenceKey = "empire-league-civilization-preference";
const mapPreferencesKey = "empire-league-map-preferences";

interface PersistedMapPreferences {
  version: 1;
  selectedQueueId?: string;
  queues?: Record<string, {
    deselectedMapIds?: string[];
    disabledGroupIds?: string[];
  }>;
}

const civilizationModes: Array<{
  id: CivilizationMode;
  label: string;
  detail: string;
  icon: typeof Swords;
}> = [
  { id: "pick", label: "Choose Civ", detail: "Play your selected civilization", icon: Swords },
  { id: "random", label: "Random", detail: "Roll a civilization after the map is chosen", icon: Shuffle },
  { id: "mirror", label: "Mirror", detail: "Match your opponent's civilization", icon: Copy }
];

export function QueuePage() {
  const { state, queues, startQueue, updateActiveQueue, cancelQueue, localizeAoe2Name } = useAppStore();
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (previewSection !== "map-pool") return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("map-pool")?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
  const [initialMapPreferences] = useState(() => buildInitialMapPreferences(queues));
  const [selectedQueueId, setSelectedQueueId] = useState(() => {
    const savedQueueId = loadMapPreferences().selectedQueueId;
    return queues.some((queue) => queue.id === savedQueueId) ? savedQueueId! : queues[0]?.id ?? "";
  });
  const configuredQueue = queues.find((queue) => queue.id === selectedQueueId) ?? queues[0];
  const selectedQueue = state.selectedQueue?.tournamentId ? state.selectedQueue : configuredQueue;
  const selectedQueueMapGroups = useMemo(() => {
    const queueMapsById = new Map(selectedQueue?.mapPool.map((map) => [map.id, map]) ?? []);
    if (queueMapsById.size === 0) return mapGroups;
    return mapGroups.map((group) => ({
      ...group,
      maps: group.maps
        .filter((map) => queueMapsById.has(map.id))
        .map((map) => ({ ...map, ...queueMapsById.get(map.id)! }))
    })).filter((group) => group.maps.length > 0);
  }, [selectedQueue]);
  const canStartQueue = ["idle", "cancelled", "completed"].includes(state.queueStatus)
    && (!state.activeMatch || state.queueStatus === "completed")
    && state.gameStatus !== "loading";
  const isSearching = state.queueStatus === "searching";
  const preferencesLocked = !["idle", "cancelled", "completed", "searching"].includes(state.queueStatus);
  const [selectedMaps, setSelectedMaps] = useState<Record<string, string[]>>(initialMapPreferences.selectedMaps);
  const [enabledGroups, setEnabledGroups] = useState<Record<string, MapGroupId[]>>(initialMapPreferences.enabledGroups);
  const [favoriteMaps, setFavoriteMaps] = useState<Record<string, Partial<Record<MapGroupId, string>>>>(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(favoriteMapsKey) ?? "{}") as Record<string, unknown>;
      return Object.fromEntries(Object.entries(saved).map(([queueId, value]) => [
        queueId,
        value && typeof value === "object" ? value as Partial<Record<MapGroupId, string>> : {}
      ]));
    } catch {
      return {};
    }
  });
  const [selectedTeamSizes, setSelectedTeamSizes] = useState<Array<2 | 4>>([2, 4]);
  const [findAnyone, setFindAnyone] = useState(true);
  const [civilizationMode, setCivilizationMode] = useState<CivilizationMode>(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(civilizationPreferenceKey) ?? "{}");
      if (saved.preferRandom === true) return "pick";
      const savedMode = saved.mode;
      return savedMode === "prefer-random" || savedMode === "full-random" ? "random" : savedMode ?? "pick";
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
  const [preferRandom, setPreferRandom] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(civilizationPreferenceKey) ?? "{}").preferRandom === true;
    } catch {
      return false;
    }
  });
  const [classicMode, setClassicMode] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(civilizationPreferenceKey) ?? "{}").classicMode === true;
    } catch {
      return false;
    }
  });
  const [civilizationBans, setCivilizationBans] = useState<{ open: string[]; closed: string[] }>(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(civilizationPreferenceKey) ?? "{}");
      return {
        open: Array.isArray(saved.openLandBans) ? saved.openLandBans.slice(0, 5) : [],
        closed: Array.isArray(saved.closedLandBans) ? saved.closedLandBans.slice(0, 5) : []
      };
    } catch {
      return { open: [], closed: [] };
    }
  });
  const [banEditorOpen, setBanEditorOpen] = useState(false);
  const [banTerrain, setBanTerrain] = useState<"open" | "closed">("open");

  const saveCivilizationPreference = (
    mode = civilizationMode,
    selectedCivilization = civilization,
    bans = civilizationBans
  ) => {
    window.localStorage.setItem(civilizationPreferenceKey, JSON.stringify({
      mode,
      civilization: selectedCivilization,
      preferRandom,
      classicMode,
      openLandBans: bans.open,
      closedLandBans: bans.closed
    }));
  };

  const selectCivilizationMode = (mode: CivilizationMode) => {
    if (
      preferRandom
      && civilizationMode === "pick"
      && (mode === "pick" || mode === "random")
    ) {
      return;
    }
    setCivilizationMode(mode);
    saveCivilizationPreference(mode);
  };

  const selectCivilization = (value: string) => {
    setCivilization(value);
    saveCivilizationPreference(civilizationMode, value);
  };

  const setClassicModePreference = (enabled: boolean) => {
    setClassicMode(enabled);
    if (enabled && !classicCivilizations.includes(civilization as typeof classicCivilizations[number])) {
      setCivilization("Byzantines");
      window.localStorage.setItem(civilizationPreferenceKey, JSON.stringify({
        mode: civilizationMode,
        civilization: "Byzantines",
        preferRandom,
        classicMode: enabled,
        openLandBans: civilizationBans.open,
        closedLandBans: civilizationBans.closed
      }));
      return;
    }
    window.localStorage.setItem(civilizationPreferenceKey, JSON.stringify({
      mode: civilizationMode,
      civilization,
      preferRandom,
      classicMode: enabled,
      openLandBans: civilizationBans.open,
      closedLandBans: civilizationBans.closed
    }));
  };

  const setPreferRandomPreference = (enabled: boolean) => {
    setPreferRandom(enabled);
    if (enabled) setCivilizationMode("pick");
    window.localStorage.setItem(civilizationPreferenceKey, JSON.stringify({
      mode: enabled ? "pick" : civilizationMode,
      civilization,
      preferRandom: enabled,
      classicMode,
      openLandBans: civilizationBans.open,
      closedLandBans: civilizationBans.closed
    }));
  };

  const toggleCivilizationBan = (terrain: "open" | "closed", name: string) => {
    setCivilizationBans((current) => {
      const list = current[terrain];
      const nextList = list.includes(name)
        ? list.filter((civilizationName) => civilizationName !== name)
        : list.length < 5 ? [...list, name] : list;
      const next = { ...current, [terrain]: nextList };
      saveCivilizationPreference(civilizationMode, civilization, next);
      return next;
    });
  };

  const randomPreference = {
    preferRandom,
    openLandBans: civilizationBans.open,
    closedLandBans: civilizationBans.closed
  };

  const toggleFavorite = (queueId: string, groupId: MapGroupId, mapId: string) => {
    setFavoriteMaps((current) => {
      const queueFavorites = { ...(current[queueId] ?? {}) };
      if (queueFavorites[groupId] === mapId) delete queueFavorites[groupId];
      else queueFavorites[groupId] = mapId;
      const next = { ...current, [queueId]: queueFavorites };
      window.localStorage.setItem(favoriteMapsKey, JSON.stringify(next));
      return next;
    });
    setSelectedMaps((current) => ({
      ...current,
      [queueId]: current[queueId]?.includes(mapId) ? current[queueId] : [...(current[queueId] ?? []), mapId]
    }));
  };

  const toggleMap = (queueId: string, groupId: MapGroupId, mapId: string) => {
    if (selectedMaps[queueId]?.includes(mapId) && favoriteMaps[queueId]?.[groupId] === mapId) {
      toggleFavorite(queueId, groupId, mapId);
    }
    setSelectedMaps((current) => {
      const queueMaps = current[queueId] ?? [];
      const removing = queueMaps.includes(mapId);
      const nextQueueMaps = removing
        ? queueMaps.filter((id) => id !== mapId)
        : [...queueMaps, mapId];
      if (removing && !hasActiveMap(queueId, nextQueueMaps, enabledGroups[queueId] ?? [], queues)) {
        return current;
      }
      return {
        ...current,
        [queueId]: nextQueueMaps
      };
    });
  };

  const toggleGroup = (queueId: string, groupId: MapGroupId) => {
    setEnabledGroups((current) => {
      const queueGroups = current[queueId] ?? [];
      const nextQueueGroups = queueGroups.includes(groupId)
        ? queueGroups.filter((id) => id !== groupId)
        : [...queueGroups, groupId];
      if (!hasActiveMap(queueId, selectedMaps[queueId] ?? [], nextQueueGroups, queues)) {
        return current;
      }
      return {
        ...current,
        [queueId]: nextQueueGroups
      };
    });
  };

  const activeMapIds = selectedQueue
    ? selectedQueue.mapPool
      .filter((map) => {
        const group = mapGroups.find((candidate) => candidate.maps.some((candidateMap) => candidateMap.id === map.id));
        return group
          && enabledGroups[selectedQueue.id]?.includes(group.id)
          && selectedMaps[selectedQueue.id]?.includes(map.id);
      })
      .map((map) => map.id)
    : [];
  const activeFavoriteEntries = selectedQueue
    ? Object.entries(favoriteMaps[selectedQueue.id] ?? {})
      .filter(([groupId, mapId]) =>
        enabledGroups[selectedQueue.id]?.includes(groupId as MapGroupId) && activeMapIds.includes(mapId))
    : [];
  const activeFavoriteMapIds = Object.fromEntries(activeFavoriteEntries) as Partial<Record<MapGroupId, string>>;
  const activeFavoriteIds = Object.values(activeFavoriteMapIds);
  const favoriteNames = selectedQueue
    ? activeFavoriteIds
      .map((id) => selectedQueue.mapPool.find((map) => map.id === id)?.name)
      .filter(Boolean)
      .join(", ")
    : "";
  const civilizationSummary = civilizationMode === "pick"
    ? civilization
    : civilizationModes.find((mode) => mode.id === civilizationMode)?.label;
  const selectedQueueHeading = selectedQueue?.format === "team"
    ? `${selectedQueue.name} - ${selectedTeamSizes.map((size) => `${size}v${size}`).join(" or ")}`
    : selectedQueue?.name;

  useEffect(() => {
    if (!state.queueStartedAt || state.queueStatus !== "searching") return;
    const timer = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - new Date(state.queueStartedAt ?? Date.now()).getTime()) / 1000));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [state.queueStartedAt, state.queueStatus]);

  useEffect(() => {
    persistMapPreferences(queues, selectedQueueId, selectedMaps, enabledGroups);
  }, [enabledGroups, queues, selectedMaps, selectedQueueId]);

  useEffect(() => {
    if (!isSearching || !selectedQueue || selectedQueue.tournamentId) return;
    const timer = window.setTimeout(() => {
      void updateActiveQueue({
        ...selectedQueue,
        classicMode,
        findAnyone,
        teamSizes: selectedQueue.format === "team" ? selectedTeamSizes : undefined,
        mapPool: selectedQueue.mapPool.filter((map) => activeMapIds.includes(map.id)),
        mapPreferences: {
          enabledGroupIds: enabledGroups[selectedQueue.id] ?? [],
          favoriteMapIds: activeFavoriteMapIds
        },
        mapCatalogVersion: mapCatalog.version,
        favoriteMapId: activeFavoriteIds[0],
        civilizationPreference: {
          mode: civilizationMode,
          civilization: civilizationMode === "pick" ? civilization : undefined,
          ...randomPreference
        }
      });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [civilization, civilizationBans, civilizationMode, classicMode, enabledGroups, favoriteMaps, findAnyone, isSearching, preferRandom, selectedMaps, selectedQueue, selectedTeamSizes]);

  const gameplayHandoffPending = state.queueStatus === "in_game"
    && state.roomSetupMilestone === "Switching to game";
  if (["creating_lobby", "waiting_for_opponent", "verifying_lobby", "ready"].includes(state.queueStatus)
    || gameplayHandoffPending) {
    return <LobbyPreparation />;
  }
  if (state.queueStatus === "in_game" || state.queueStatus === "verifying_result") {
    return <ActiveMatch />;
  }
  if (state.queueStatus === "completed") {
    return <ResultScreen />;
  }
  if (isSearching && selectedQueue?.tournamentId) {
    return (
      <section className="search-waiting-layout matchmaking-overview">
        <div className="search-state">
          <div className="search-orbit"><Swords size={34} /></div>
          <span className="eyebrow">Tournament ready check</span>
          <h2>Waiting for your opponent</h2>
          <p>Your position is reserved. Lobby automation will begin as soon as your opponent is ready.</p>
          <div className="queue-summary">
            <div><span>Map</span><strong>{selectedQueue.mapPool[0]?.name ?? "Tournament map"}</strong></div>
            <div><span>Civilization</span><strong>{selectedQueue.civilizationPreference?.civilization ?? "Random"}</strong></div>
          </div>
          <button className="secondary" type="button" onClick={() => void cancelQueue()}>
            <XCircle size={18} /> Leave Ready Check
          </button>
        </div>
        <MatchmakingBrand />
      </section>
    );
  }

  return (
    <section className="stack queue-page">
      {selectedQueue && (
        <div className="search-waiting-layout matchmaking-overview">
          <div className="search-state">
            {isSearching ? (
              <>
                <div className="search-orbit"><Search size={34} /></div>
                <h2>Searching for an opponent</h2>
                <div className="metrics-grid compact">
                  <div>
                    <span>Your {selectedQueue.format === "team" ? "team " : ""}rating</span>
                    <strong>{selectedQueue.format === "team" ? state.currentUser.teamRating : state.currentUser.rating}</strong>
                  </div>
                  <div>
                    <span>Current search range</span>
                    <strong>{findAnyone ? "Anyone" : `${state.searchRange.min}-${state.searchRange.max}`}</strong>
                  </div>
                  <div><span>Time searching</span><strong>{formatTime(elapsed)}</strong></div>
                  <div><span>Estimated wait</span><strong>{state.selectedQueue?.estimatedWaitSeconds}s</strong></div>
                </div>
                <p className="search-helper">Civ and map changes below auto-update your search. It's safe to minimize the app while searching.</p>
                <label className="toggle-row compact-toggle">
                  <span>Find anyone</span>
                  <input
                    type="checkbox"
                    checked={findAnyone}
                    onChange={(event) => setFindAnyone(event.target.checked)}
                  />
                </label>
                <button className="secondary" type="button" onClick={() => void cancelQueue()}>
                  <XCircle size={18} /> Cancel Search
                </button>
              </>
            ) : (
              <>
                <h2>{selectedQueueHeading}</h2>
                <div className={`queue-stats${isPreviewMode ? "" : " queue-stats-hidden"}`}>
                  <span><Search size={18} /><strong>{selectedQueue.playersSearching}</strong> searching</span>
                  <span><Clock size={18} /><strong>~{selectedQueue.estimatedWaitSeconds}s</strong> wait</span>
                </div>
                <div className="queue-summary">
                  <div><span>Civilization</span><strong>{civilizationSummary}</strong></div>
                  <div><span>Classic Mode</span><strong>{classicMode ? "On" : "Off"}</strong></div>
                  {civilizationMode !== "mirror" && (
                    <div><span>Prefer Random</span><strong>{preferRandom ? "Yes" : "No"}</strong></div>
                  )}
                  <div><span>Maps enabled</span><strong>{activeMapIds.length}</strong></div>
                  <div><span>Favorites</span><strong>{favoriteNames || "None"}</strong></div>
                </div>
                <label className="toggle-row compact-toggle">
                  <span>Find anyone</span>
                  <input
                    type="checkbox"
                    checked={findAnyone}
                    onChange={(event) => setFindAnyone(event.target.checked)}
                  />
                </label>
                <button
                  className="queue-search-button"
                  type="button"
                  disabled={!canStartQueue || activeMapIds.length === 0}
                  onClick={() => void startQueue({
                    ...selectedQueue,
                    classicMode,
                    findAnyone,
                    teamSizes: selectedQueue.format === "team" ? selectedTeamSizes : undefined,
                    mapPool: selectedQueue.mapPool.filter((map) => activeMapIds.includes(map.id)),
                    mapPreferences: {
                      enabledGroupIds: enabledGroups[selectedQueue.id] ?? [],
                      favoriteMapIds: activeFavoriteMapIds
                    },
                    mapCatalogVersion: mapCatalog.version,
                    favoriteMapId: activeFavoriteIds[0],
                    civilizationPreference: {
                      mode: civilizationMode,
                      civilization: civilizationMode === "pick" ? civilization : undefined,
                      ...randomPreference
                    }
                  })}
                >
                  <Search size={22} /> {state.gameStatus === "loading" ? "Launching AoE2…" : "Find Match"}
                </button>
              </>
            )}
          </div>
          <MatchmakingBrand />
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
                {selectedQueue.format === "team" && (
                  <>
                    <span className="eyebrow">Team size</span>
                    <div className="match-type-options" aria-label="Team game sizes">
                      {([2, 4] as const).map((size) => {
                        const selected = selectedTeamSizes.includes(size);
                        return (
                          <button
                            className={selected ? "civilization-mode active" : "civilization-mode"}
                            type="button"
                            key={size}
                            aria-pressed={selected}
                            disabled={preferencesLocked}
                            onClick={() => setSelectedTeamSizes((current) => {
                              if (current.includes(size)) {
                                return current.length === 1 ? current : current.filter((item) => item !== size);
                              }
                              return [...current, size].sort() as Array<2 | 4>;
                            })}
                          >
                            <Users size={20} />
                            <span>
                              <strong>{size}v{size}</strong>
                              <small>{size * 2} players</small>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
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
                        className={civilizationMode === mode.id
                          ? "civilization-option-card active"
                          : "civilization-option-card"}
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
                          <>
                            <ThemedSelect
                              className="civilization-select"
                              label="Civilization"
                              options={(classicMode ? classicCivilizations : civilizations).map((name) => ({ value: name, label: localizeAoe2Name(name) }))}
                              value={civilization}
                              onChange={selectCivilization}
                              disabled={preferencesLocked || civilizationMode !== "pick"}
                              searchable
                              displayValue={civilizationMode === "pick" ? undefined : "N/A"}
                            />
                            <button
                              className="civilization-select-activate"
                              type="button"
                              aria-label={`Choose ${civilization}`}
                              disabled={preferencesLocked}
                              onClick={() => selectCivilizationMode("pick")}
                            />
                          </>
                        )}
                        {mode.id === "random" && (
                          <button
                            className="civilization-card-settings"
                            type="button"
                            aria-label="Configure random civilization bans"
                            disabled={preferencesLocked}
                            onClick={() => setBanEditorOpen(true)}
                          >
                            <Settings size={17} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
                {selectedQueue.ranked && (
                  <>
                    <span className="eyebrow civilization-options-heading">Options</span>
                    <div className="civilization-options">
                      <div className="civilization-checkbox-row">
                        <label>
                          <input
                            type="checkbox"
                            checked={classicMode}
                            disabled={preferencesLocked}
                            onChange={(event) => setClassicModePreference(event.target.checked)}
                          />
                          <span>Classic Mode</span>
                        </label>
                        <HelpTooltip text="Only civilizations through The Mountain Royals, excluding Chinese, Incas, Koreans, and Vietnamese. Also matches classic civ picks, Mirror, and compatible Random searches." />
                      </div>
                      <div className="civilization-checkbox-row">
                        <label>
                          <input
                            type="checkbox"
                            checked={preferRandom}
                            disabled={preferencesLocked}
                            onChange={(event) => setPreferRandomPreference(event.target.checked)}
                          />
                          <span>Prefer Random</span>
                        </label>
                        <HelpTooltip text="If your opponent selects Random, you'll also receive a random civilization. Otherwise, you'll play your selected civilization." />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="preference-section map-preference-section" id="map-pool">
                <div className="preference-heading">
                  <div>
                    <span className="eyebrow">Map pool</span>
                  </div>
                  <span className="selection-count">
                    {activeMapIds.length} maps across {enabledGroups[selectedQueue.id]?.length ?? 0} groups
                  </span>
                </div>
                <GroupedMapPool
                  groups={selectedQueueMapGroups}
                  enabledGroupIds={enabledGroups[selectedQueue.id] ?? []}
                  selectedMapIds={selectedMaps[selectedQueue.id] ?? []}
                  favoriteMapIds={favoriteMaps[selectedQueue.id] ?? {}}
                  onToggleGroup={(groupId) => toggleGroup(selectedQueue.id, groupId)}
                  onToggleMap={(groupId, mapId) => toggleMap(selectedQueue.id, groupId, mapId)}
                  onFavorite={(groupId, mapId) => toggleFavorite(selectedQueue.id, groupId, mapId)}
                  disabled={preferencesLocked}
                />
              </div>
            </article>
            {false && <aside className="queue-card queue-action-panel">
              <h2>{selectedQueueHeading}</h2>
              <div className="queue-stats">
                <span><Search size={18} /><strong>{selectedQueue.playersSearching}</strong> searching</span>
                <span><Clock size={18} /><strong>~{selectedQueue.estimatedWaitSeconds}s</strong> wait</span>
              </div>
              <div className="queue-summary">
                <div>
                  <span>Civilization</span>
                  <strong>{civilizationSummary}</strong>
                </div>
                {civilizationMode !== "mirror" && (
                  <div><span>Prefer Random</span><strong>{preferRandom ? "Yes" : "No"}</strong></div>
                )}
                <div><span>Maps enabled</span><strong>{activeMapIds.length}</strong></div>
                <div><span>Favorites</span><strong>{favoriteNames || "None"}</strong></div>
              </div>
              <button
                  className="queue-search-button"
                  type="button"
                  disabled={!canStartQueue || activeMapIds.length === 0}
                  onClick={() => void startQueue({
                    ...selectedQueue,
                    classicMode,
                    teamSizes: selectedQueue.format === "team" ? selectedTeamSizes : undefined,
                    mapPool: selectedQueue.mapPool.filter((map) => activeMapIds.includes(map.id)),
                    mapPreferences: {
                      enabledGroupIds: enabledGroups[selectedQueue.id] ?? [],
                      favoriteMapIds: activeFavoriteMapIds
                    },
                    mapCatalogVersion: mapCatalog.version,
                    favoriteMapId: activeFavoriteIds[0],
                    civilizationPreference: {
                      mode: civilizationMode,
                      civilization: civilizationMode === "pick"
                        ? civilization
                        : undefined,
                      ...randomPreference
                    }
                  })}
                >
                  <Search size={22} /> {state.gameStatus === "loading" ? "Launching AoE2…" : "Find Match"}
              </button>
            </aside>}
          </div>
        </>
      ) : (
        <div className="empty-state">No matchmaking modes are available.</div>
      )}
      {banEditorOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="civ-ban-title" onMouseDown={() => setBanEditorOpen(false)}>
          <div className="match-modal civilization-ban-modal" onMouseDown={(event) => event.stopPropagation()}>
            <div className="civilization-ban-header">
              <div>
                <span className="eyebrow">Random civilization settings</span>
                <h2 id="civ-ban-title">Civilization bans</h2>
              </div>
            </div>
            <p>Ban up to 5 civilizations for each map style. Both players' bans are combined, so neither player can roll a banned civilization.</p>
            <ThemedSelect
              className="civilization-ban-map-select"
              label="Map style"
              options={[
                { value: "open", label: `Open land maps (${civilizationBans.open.length}/5 banned)` },
                { value: "closed", label: `Closed land maps (${civilizationBans.closed.length}/5 banned)` }
              ]}
              value={banTerrain}
              onChange={(value) => setBanTerrain(value as "open" | "closed")}
            />
            <CivilizationBanList
              title={banTerrain === "open" ? "Open land maps" : "Closed land maps"}
              selected={civilizationBans[banTerrain]}
              onToggle={(name) => toggleCivilizationBan(banTerrain, name)}
            />
            <div className="modal-actions">
              <button className="secondary" type="button" onClick={() => {
                const next = { open: [], closed: [] };
                setCivilizationBans(next);
                saveCivilizationPreference(civilizationMode, civilization, next);
              }}>Clear bans</button>
              <button className="primary" type="button" onClick={() => setBanEditorOpen(false)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function CivilizationBanList({ title, selected, onToggle }: {
  title: string;
  selected: string[];
  onToggle: (name: string) => void;
}) {
  const { localizeAoe2Name } = useAppStore();
  return (
    <section className="civilization-ban-group">
      <div className="civilization-ban-group-heading">
        <strong>{title}</strong>
        <span>{selected.length}/5 selected</span>
      </div>
      <div className="civilization-ban-grid">
        {civilizations.map((name) => {
          const checked = selected.includes(name);
          return (
            <label className={checked ? "selected" : ""} key={name}>
              <input
                type="checkbox"
                checked={checked}
                disabled={!checked && selected.length >= 5}
                onChange={() => onToggle(name)}
              />
              <span>{localizeAoe2Name(name)}</span>
            </label>
          );
        })}
      </div>
    </section>
  );
}

function formatTime(seconds: number): string {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function HelpTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  return (
    <span className="help-tooltip" data-open={open || undefined}>
      <button
        type="button"
        className="help-tooltip-trigger"
        aria-label="More information"
        aria-describedby={tooltipId}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <CircleHelp size={16} aria-hidden="true" />
      </button>
      <span id={tooltipId} className="help-tooltip-content" role="tooltip">{text}</span>
    </span>
  );
}

function loadMapPreferences(): PersistedMapPreferences {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(mapPreferencesKey) ?? "{}") as PersistedMapPreferences;
    return parsed && typeof parsed === "object" ? parsed : { version: 1 };
  } catch {
    return { version: 1 };
  }
}

function buildInitialMapPreferences(queues: ReturnType<typeof useAppStore>["queues"]) {
  const saved = loadMapPreferences();
  const selectedMaps: Record<string, string[]> = {};
  const enabledGroups: Record<string, MapGroupId[]> = {};

  for (const queue of queues) {
    const deselected = new Set(saved.queues?.[queue.id]?.deselectedMapIds ?? []);
    const disabled = new Set(saved.queues?.[queue.id]?.disabledGroupIds ?? []);
    selectedMaps[queue.id] = queue.mapPool.map((map) => map.id).filter((mapId) => !deselected.has(mapId));
    enabledGroups[queue.id] = mapGroups.map((group) => group.id).filter((groupId) => !disabled.has(groupId));

    if (!hasActiveMap(queue.id, selectedMaps[queue.id], enabledGroups[queue.id], queues)) {
      const fallbackMap = queue.mapPool[0];
      const fallbackGroup = mapGroups.find((group) => group.maps.some((map) => map.id === fallbackMap?.id));
      if (fallbackMap && fallbackGroup) {
        selectedMaps[queue.id] = [...new Set([...selectedMaps[queue.id], fallbackMap.id])];
        enabledGroups[queue.id] = [...new Set([...enabledGroups[queue.id], fallbackGroup.id])];
      }
    }
  }

  return { selectedMaps, enabledGroups };
}

function hasActiveMap(
  queueId: string,
  selectedMapIds: string[],
  enabledGroupIds: MapGroupId[],
  queues: ReturnType<typeof useAppStore>["queues"]
): boolean {
  const queueMapIds = new Set(queues.find((queue) => queue.id === queueId)?.mapPool.map((map) => map.id) ?? []);
  const enabledMapIds = new Set(
    mapGroups
      .filter((group) => enabledGroupIds.includes(group.id))
      .flatMap((group) => group.maps.map((map) => map.id))
  );
  return selectedMapIds.some((mapId) => queueMapIds.has(mapId) && enabledMapIds.has(mapId));
}

function persistMapPreferences(
  queues: ReturnType<typeof useAppStore>["queues"],
  selectedQueueId: string,
  selectedMaps: Record<string, string[]>,
  enabledGroups: Record<string, MapGroupId[]>
) {
  const previous = loadMapPreferences();
  const persistedQueues = { ...(previous.queues ?? {}) };

  for (const queue of queues) {
    const currentMapIds = new Set(queue.mapPool.map((map) => map.id));
    const currentGroupIds = new Set<MapGroupId>(mapGroups.map((group) => group.id));
    const previousQueue = previous.queues?.[queue.id];
    const dormantDeselectedMapIds = (previousQueue?.deselectedMapIds ?? [])
      .filter((mapId) => !currentMapIds.has(mapId));
    const dormantDisabledGroupIds = (previousQueue?.disabledGroupIds ?? [])
      .filter((groupId) => !currentGroupIds.has(groupId as MapGroupId));

    persistedQueues[queue.id] = {
      deselectedMapIds: [
        ...new Set([
          ...dormantDeselectedMapIds,
          ...queue.mapPool
            .map((map) => map.id)
            .filter((mapId) => !(selectedMaps[queue.id] ?? []).includes(mapId))
        ])
      ],
      disabledGroupIds: [
        ...new Set([
          ...dormantDisabledGroupIds,
          ...mapGroups
            .map((group) => group.id)
            .filter((groupId) => !(enabledGroups[queue.id] ?? []).includes(groupId))
        ])
      ]
    };
  }

  window.localStorage.setItem(mapPreferencesKey, JSON.stringify({
    version: 1,
    selectedQueueId,
    queues: persistedQueues
  } satisfies PersistedMapPreferences));
}
