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
        <Metric label="Current Rating" value={user.rating} />
        <Metric label="Peak Rating" value={user.peakRating} />
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
      <div className="panel">
        <h2>Favorite Maps</h2>
        {user.preferredMaps.length > 0
          ? <div className="tag-list">{user.preferredMaps.map((map) => <span key={map}>{map}</span>)}</div>
          : <div className="empty-state">No favorite maps yet.</div>}
      </div>
      <div className="panel">
        <h2>Favorite Civilizations</h2>
        {user.favoriteCivilizations.length > 0
          ? <div className="tag-list">{user.favoriteCivilizations.map((civ) => <span key={civ}>{civ}</span>)}</div>
          : <div className="empty-state">No favorite civilizations yet.</div>}
      </div>
    </section>
  );
}
