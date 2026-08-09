import { useEffect, useState } from "react";
import { FormPips } from "../components/common/FormPips";
import { Metric } from "../components/common/Metric";
import { useAppStore } from "../state/appStore";
import type { MatchSummary } from "../../shared/contracts/matches";
import type { PlayerProfile } from "../../shared/contracts/players";
import { playerService } from "../services/playerService";

interface RatingPoint {
  id: string;
  label: string;
  rating: number;
}

function buildRatingHistory(matches: MatchSummary[], currentRating: number): RatingPoint[] {
  const soloMatches = matches
    .filter((match) => match.queueType !== "team-games")
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  if (soloMatches.length === 0) return [];

  let rating = currentRating - soloMatches.reduce((total, match) => total + match.ratingChange, 0);
  const points: RatingPoint[] = [{
    id: "starting-rating",
    label: "Initial ELO",
    rating
  }];

  for (const match of soloMatches) {
    rating += match.ratingChange;
    points.push({
      id: match.id,
      label: new Date(match.timestamp).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric"
      }),
      rating
    });
  }

  return points;
}

function RatingChart({ matches, currentRating, possessive = "Your" }: { matches: MatchSummary[]; currentRating: number; possessive?: string }) {
  const [activePointId, setActivePointId] = useState<string | null>(null);
  const points = buildRatingHistory(matches, currentRating);
  if (points.length === 0) {
    return <div className="empty-state">{possessive} Elo progress will appear after the first 1v1 match.</div>;
  }

  const width = 800;
  const height = 260;
  const padding = { top: 22, right: 22, bottom: 42, left: 58 };
  const ratings = points.map((point) => point.rating);
  const dataMin = Math.min(...ratings);
  const dataMax = Math.max(...ratings);
  const chartMin = Math.floor((dataMin - 20) / 25) * 25;
  const chartMax = Math.ceil((dataMax + 20) / 25) * 25;
  const range = Math.max(chartMax - chartMin, 1);
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const coordinates = points.map((point, index) => ({
    ...point,
    x: padding.left + (index / Math.max(points.length - 1, 1)) * plotWidth,
    y: padding.top + ((chartMax - point.rating) / range) * plotHeight
  }));
  const line = coordinates.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `${padding.left},${padding.top + plotHeight} ${line} ${padding.left + plotWidth},${padding.top + plotHeight}`;
  const ticks = Array.from({ length: 5 }, (_, index) => {
    const ratio = index / 4;
    return {
      y: padding.top + ratio * plotHeight,
      rating: Math.round(chartMax - ratio * range)
    };
  });
  const change = points.at(-1)!.rating - points[0].rating;
  const activePoint = coordinates.find((point) => point.id === activePointId);
  const tooltipWidth = 126;
  const tooltipHeight = 44;
  const tooltipX = activePoint
    ? Math.min(Math.max(activePoint.x - tooltipWidth / 2, padding.left), width - padding.right - tooltipWidth)
    : 0;
  const tooltipY = activePoint
    ? activePoint.y - tooltipHeight - 12 < 4
      ? activePoint.y + 12
      : activePoint.y - tooltipHeight - 12
    : 0;

  return (
    <>
      <div className="rating-chart-summary">
        <span>{points.length - 1} recorded {points.length === 2 ? "match" : "matches"}</span>
        <strong className={change >= 0 ? "win" : "loss"}>
          {change > 0 ? "+" : ""}{change} Elo
        </strong>
      </div>
      <div className="rating-chart" role="img" aria-label={`Elo progress over ${points.length - 1} recorded matches, ending at ${currentRating}`}>
        <svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
          <defs>
            <linearGradient id="rating-chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {ticks.map((tick) => (
            <g key={tick.y}>
              <line className="rating-chart-grid" x1={padding.left} x2={width - padding.right} y1={tick.y} y2={tick.y} />
              <text className="rating-chart-axis" x={padding.left - 10} y={tick.y + 4} textAnchor="end">{tick.rating}</text>
            </g>
          ))}
          <polygon className="rating-chart-area" points={area} />
          <polyline className="rating-chart-line" points={line} />
          {coordinates.map((point) => (
            <g
              className="rating-chart-point-target"
              key={point.id}
              onPointerEnter={() => setActivePointId(point.id)}
              onPointerLeave={() => setActivePointId(null)}
            >
              <circle className="rating-chart-hit-area" cx={point.x} cy={point.y} r="13" />
              <circle className="rating-chart-point" cx={point.x} cy={point.y} r={activePointId === point.id ? 6 : 4} />
            </g>
          ))}
          {activePoint && (
            <g className="rating-chart-tooltip" transform={`translate(${tooltipX} ${tooltipY})`}>
              <rect width={tooltipWidth} height={tooltipHeight} />
              <text className="rating-chart-tooltip-label" x="10" y="17">{activePoint.label}</text>
              <text className="rating-chart-tooltip-value" x="10" y="34">{activePoint.rating} Elo</text>
            </g>
          )}
          <text className="rating-chart-axis" x={padding.left} y={height - 13}>{points[1]?.label}</text>
          <text className="rating-chart-axis" x={width - padding.right} y={height - 13} textAnchor="end">{points.at(-1)?.label}</text>
        </svg>
      </div>
    </>
  );
}

export function ProfilePage({
  friendIds,
  outgoingRequestIds,
  onAddFriend
}: {
  friendIds: string[];
  outgoingRequestIds: string[];
  onAddFriend: (displayName: string) => Promise<void>;
}) {
  const { state, selectedProfileId } = useAppStore();
  const viewingOwnProfile = !selectedProfileId || selectedProfileId === state.currentUser.id;
  const [profile, setProfile] = useState<{ player: PlayerProfile; matches: MatchSummary[] } | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [addingFriend, setAddingFriend] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    setRequestSent(false);
    if (viewingOwnProfile) {
      setProfile(null);
      setLoadError(null);
      return;
    }
    let cancelled = false;
    setProfile(null);
    setLoadError(null);
    void playerService.getProfile(selectedProfileId)
      .then((result) => { if (!cancelled) setProfile(result); })
      .catch((error) => {
        if (!cancelled) setLoadError(error instanceof Error ? error.message : "Player profile could not be loaded.");
      });
    return () => { cancelled = true; };
  }, [selectedProfileId, viewingOwnProfile]);

  if (!viewingOwnProfile && !profile) {
    return <div className="panel empty-state">{loadError ?? "Loading player profile…"}</div>;
  }

  const user = viewingOwnProfile ? state.currentUser : profile!.player;
  const matches = viewingOwnProfile ? state.recentMatches : profile!.matches;
  const recentForm = matches.slice(0, 5).map((match) => match.outcome);
  const isFriend = friendIds.includes(user.id);
  const isPending = requestSent || outgoingRequestIds.includes(user.id);

  async function addFriend() {
    setAddingFriend(true);
    try {
      await onAddFriend(user.displayName);
      setRequestSent(true);
    } finally {
      setAddingFriend(false);
    }
  }

  return (
    <section className="profile-layout">
      <div className="panel profile-card">
        <div className="avatar huge-avatar">
          {user.avatarUrl
            ? <img src={user.avatarUrl} alt="" />
            : user.displayName.slice(0, 2).toUpperCase()}
        </div>
        <div className="profile-card-identity">
          <h2 data-ui-translation="off">{user.displayName}</h2>
          <span>{user.steamId ? `Steam ID ${user.steamId}` : "Steam account"}</span>
        </div>
        <div className="profile-card-status">
          {recentForm.length > 0 && (
            <div className="profile-recent-form">
              <span>Recent W/L</span>
              <FormPips form={recentForm} />
            </div>
          )}
        {!viewingOwnProfile && !isFriend && (
          <button className="primary profile-friend-button" type="button" disabled={addingFriend || isPending} onClick={() => void addFriend()}>
            {isPending ? "Friend request sent" : addingFriend ? "Sending…" : "Add friend"}
          </button>
        )}
          {!viewingOwnProfile && isFriend && <span className="profile-friend-status">Friends</span>}
        </div>
      </div>
      <div className="metrics-grid">
        <Metric
          label="1v1 RM Rating"
          value={user.rating}
          detail={`${user.legacy1v1Wins}-${user.legacy1v1Losses} legacy record`}
        />
        <Metric label="1v1 RM Peak" value={user.peakRating} />
        <Metric label="Global Rank" value={`#${user.rank.toLocaleString()}`} />
        <Metric
          label="Team RM Rating"
          value={user.teamRating}
          detail={`${user.legacyTeamWins}-${user.legacyTeamLosses} legacy record`}
        />
        <Metric label="Team RM Peak" value={user.teamPeakRating} />
        <Metric label="Season Record" value={`${user.wins}-${user.losses}`} />
      </div>
      <div className="panel span-2">
        <h2>Elo Progress</h2>
        <RatingChart matches={matches} currentRating={user.rating} possessive={viewingOwnProfile ? "Your" : `${user.displayName}'s`} />
      </div>
    </section>
  );
}
