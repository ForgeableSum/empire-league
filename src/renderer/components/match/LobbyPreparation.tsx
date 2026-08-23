import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import civBonuses from "../../../shared/civBonuses.json";
import type {
  CivilizationPreference,
  MatchSession,
  MatchSessionParticipant
} from "../../../shared/contracts/matchmaking";
import { getCatalogMap } from "../../../shared/mapCatalog";
import { maps } from "../../mocks/mockPlayers";
import { useAppStore } from "../../state/appStore";
import { MatchmakingBrand } from "./MatchmakingBrand";

type CivilizationName = keyof typeof civBonuses;

export function LobbyPreparation() {
  const { state, prepareLobby, localizeAoe2Name, localizeAoe2MapDescription } = useAppStore();
  const inputLocked = !state.error;
  const match = state.activeMatch;
  const countdownMs = state.roomSetupEstimateMs ?? 60_000;
  const [remaining, setRemaining] = useState(() => getRemaining(state.roomSetupStartedAt, countdownMs));
  const selectedMap = maps.find((map) => map.id === match?.selectedMap?.id) ?? match?.selectedMap;
  const canonicalMapDescription = selectedMap ? getCatalogMap(selectedMap.id)?.description : undefined;
  const mapDescription = selectedMap && canonicalMapDescription
    ? localizeAoe2MapDescription(selectedMap.name, canonicalMapDescription)
    : canonicalMapDescription;
  const teams = getCivilizationTeams(match);
  const civilizationRows = Math.max(teams.player.length, teams.opponent.length, 1);
  const isTeamGame = match?.queue.format === "team" || civilizationRows > 1;

  useEffect(() => {
    const update = () => setRemaining(getRemaining(state.roomSetupStartedAt, countdownMs));
    update();
    const timer = window.setInterval(update, 250);
    return () => window.clearInterval(timer);
  }, [countdownMs, state.roomSetupStartedAt]);

  return (
    <section className="search-waiting-layout" aria-busy={inputLocked}>
      <div className="search-state">
        <span className="eyebrow">Preparing game</span>
        <h2>{remaining > 0 ? "Game starts in" : "Starting game…"}</h2>
        {remaining > 0 && <div className="lobby-countdown" aria-live="polite">{remaining}</div>}
        <div className="lobby-milestone" aria-live="polite">
          <Loader2 size={18} className="spin" aria-hidden="true" />
          <span>{state.roomSetupMilestone ?? "Preparing game"}</span>
        </div>
        {state.error && (
          <div className="error-panel">
            <strong>{state.error.message}</strong>
            <span>{state.error.technicalDetails}</span>
            <button type="button" onClick={() => void prepareLobby()}>Try Again</button>
          </div>
        )}
      </div>
      <MatchmakingBrand />
      <div className={`civilization-matchup${isTeamGame ? " team-game" : ""}`} style={{ "--civilization-rows": civilizationRows } as CSSProperties}>
        <article className="upcoming-map-card">
          <span className="eyebrow">Map</span>
          <h3>{selectedMap ? localizeAoe2Name(selectedMap.name) : "Map pending"}</h3>
          {selectedMap?.thumbnailUrl ? (
            <img src={selectedMap.thumbnailUrl} alt={`Preview of ${selectedMap.name}`} />
          ) : (
            <div className="upcoming-map-placeholder">Map preview unavailable</div>
          )}
          {mapDescription && <p className="upcoming-map-description">{mapDescription}</p>}
        </article>
        {isTeamGame ? (
          <>
            <div className="civilization-team-column player">
              <div className="civilization-team-heading player">Your team</div>
              {teams.player.map((participant, index) => (
                <CivilizationBonuses
                  key={`${participant.player.id}-${participant.lobbySlot}`}
                  civilization={resolveParticipantCivilization(participant, teams.opponent)}
                  label={participant.isCurrentPlayer ? "Your civilization" : participant.player.displayName}
                  row={index + 1}
                  side="player"
                />
              ))}
            </div>
            <div className="civilization-team-column opponent">
              <div className="civilization-team-heading opponent">Opposing team</div>
              {teams.opponent.map((participant, index) => (
                <CivilizationBonuses
                  key={`${participant.player.id}-${participant.lobbySlot}`}
                  civilization={resolveParticipantCivilization(participant, teams.player)}
                  label={participant.player.displayName || "Opponent civilization"}
                  row={index + 1}
                  side="opponent"
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <CivilizationBonuses
              civilization={resolveParticipantCivilization(teams.player[0], teams.opponent)}
              label="Your civilization"
              row={1}
              side="player"
            />
            <CivilizationBonuses
              civilization={resolveParticipantCivilization(teams.opponent[0], teams.player)}
              label="Opponent civilization"
              row={1}
              side="opponent"
            />
          </>
        )}
      </div>
    </section>
  );
}

function resolveCivilization(
  preference?: CivilizationPreference,
  otherPreference?: CivilizationPreference
): CivilizationName | null {
  const selected = preference?.mode === "mirror" ? otherPreference?.civilization : preference?.civilization;
  return selected && selected in civBonuses ? selected as CivilizationName : null;
}

function resolveParticipantCivilization(
  participant: MatchSessionParticipant,
  otherTeam: MatchSessionParticipant[]
): CivilizationName | null {
  const opposingPreference = otherTeam.find((other) => other.civilizationPreference?.civilization)
    ?.civilizationPreference;
  return resolveCivilization(participant.civilizationPreference, opposingPreference);
}

function getCivilizationTeams(match: MatchSession | null): {
  player: MatchSessionParticipant[];
  opponent: MatchSessionParticipant[];
} {
  if (match?.participants?.length) {
    const current = match.participants.find((participant) => participant.isCurrentPlayer);
    const playerTeam = current?.team ?? match.team ?? 1;
    const bySlot = (left: MatchSessionParticipant, right: MatchSessionParticipant) => {
      if (left.isCurrentPlayer !== right.isCurrentPlayer) return left.isCurrentPlayer ? -1 : 1;
      return left.lobbySlot - right.lobbySlot;
    };
    return {
      player: match.participants.filter((participant) => participant.team === playerTeam).sort(bySlot),
      opponent: match.participants.filter((participant) => participant.team !== playerTeam).sort(bySlot)
    };
  }

  if (!match) return { player: [], opponent: [] };
  const playerTeam = match.team ?? 1;
  return {
    player: [{
      player: match.player,
      civilizationPreference: {
        mode: "pick",
        civilization: resolveCivilization(match.queue.civilizationPreference, match.opponentCivilizationPreference) ?? undefined
      },
      lobbySlot: match.lobbySlot ?? 1,
      team: playerTeam,
      isCurrentPlayer: true
    }],
    opponent: [{
      player: match.opponent,
      civilizationPreference: {
        mode: "pick",
        civilization: resolveCivilization(match.opponentCivilizationPreference, match.queue.civilizationPreference) ?? undefined
      },
      lobbySlot: playerTeam === 1 ? 2 : 1,
      team: playerTeam === 1 ? 2 : 1,
      isCurrentPlayer: false
    }]
  };
}

function CivilizationBonuses({
  civilization,
  label,
  row,
  side
}: {
  civilization: CivilizationName | null;
  label: string;
  row: number;
  side: "player" | "opponent";
}) {
  const { localizeAoe2Name, getLocalizedAoe2CivilizationBonuses } = useAppStore();
  const details = civilization
    ? getLocalizedAoe2CivilizationBonuses(civilization) ?? civBonuses[civilization]
    : null;
  return (
    <article className={`civ-bonus-card ${side}${row > 1 ? " additional" : ""}`}>
      <span className="eyebrow">{label}</span>
      <h3>{civilization ? localizeAoe2Name(civilization) : "Random civilization"}</h3>
      {details ? (
        <>
          <ul>{details.bonuses.map((bonus) => <li key={bonus}>{bonus}</li>)}</ul>
          <div className="team-bonus">
            <span>Team bonus</span>
            <p>{details.teamBonus}</p>
          </div>
        </>
      ) : (
        <p className="civ-bonus-unavailable">Bonuses will be revealed when the civilization is known.</p>
      )}
    </article>
  );
}

function getRemaining(startedAt: string | null, countdownMs: number): number {
  const countdownSeconds = Math.ceil(countdownMs / 1000);
  if (!startedAt) return countdownSeconds;
  const elapsedSeconds = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
  return Math.max(0, countdownSeconds - elapsedSeconds);
}
