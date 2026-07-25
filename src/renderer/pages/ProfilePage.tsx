import { FormPips } from "../components/common/FormPips";
import { Metric } from "../components/common/Metric";
import { useAppStore } from "../state/appStore";

export function ProfilePage() {
  const { state } = useAppStore();
  const user = state.currentUser;
  const recentForm = state.recentMatches.slice(0, 5).map((match) => match.outcome);
  return (
    <section className="profile-layout">
      <div className="panel profile-card">
        <div className="avatar huge-avatar">
          {user.avatarUrl
            ? <img src={user.avatarUrl} alt="" />
            : user.displayName.slice(0, 2).toUpperCase()}
        </div>
        <h2>{user.displayName}</h2>
        <span>{user.steamId ? `Steam ID ${user.steamId}` : "Steam account"}</span>
        {recentForm.length > 0 && <FormPips form={recentForm} />}
      </div>
      <div className="metrics-grid">
        <Metric
          label="1v1 RM Rating"
          value={user.rating}
          detail={`${user.legacy1v1Wins}-${user.legacy1v1Losses} legacy record`}
        />
        <Metric label="1v1 RM Peak" value={user.peakRating} />
        <Metric
          label="Team RM Rating"
          value={user.teamRating}
          detail={`${user.legacyTeamWins}-${user.legacyTeamLosses} legacy record`}
        />
        <Metric label="Team RM Peak" value={user.teamPeakRating} />
        <Metric label="Global Rank" value={`#${user.rank.toLocaleString()}`} />
        <Metric label="Season Record" value={`${user.wins}-${user.losses}`} />
      </div>
      <div className="panel span-2">
        <h2>Rating History</h2>
        {state.recentMatches.length === 0 ? (
          <div className="empty-state">Your rating history will appear after your first match.</div>
        ) : (
          <div className="table">
            {state.recentMatches.slice(0, 10).map((match) => (
              <div className="table-row" key={match.id}>
                <span>{new Date(match.timestamp).toLocaleDateString()}</span>
                <span>{match.opponent}</span>
                <strong className={match.ratingChange >= 0 ? "win" : "loss"}>
                  {match.ratingChange > 0 ? "+" : ""}{match.ratingChange}
                </strong>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
