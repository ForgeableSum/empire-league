import { FormPips } from "../components/common/FormPips";
import { Metric } from "../components/common/Metric";
import { useAppStore } from "../state/appStore";

export function ProfilePage() {
  const { state } = useAppStore();
  const user = state.currentUser;
  return (
    <section className="profile-layout">
      <div className="panel profile-card">
        <div className="avatar huge-avatar">{user.displayName.slice(0, 2).toUpperCase()}</div>
        <h2>{user.displayName}</h2>
        <span>{user.countryCode} · AoE Profile {user.aoeProfileId}</span>
        <FormPips form={user.recentForm} />
      </div>
      <div className="metrics-grid">
        <Metric label="Current Rating" value={user.rating} />
        <Metric label="Peak Rating" value={user.peakRating} />
        <Metric label="Global Rank" value={`#${user.rank.toLocaleString()}`} />
        <Metric label="Season Record" value={`${user.wins}-${user.losses}`} />
      </div>
      <div className="panel span-2">
        <h2>Rating History</h2>
        <div className="chart-placeholder">
          {[22, 38, 34, 48, 42, 58, 53, 68, 61, 74, 70, 82].map((height, index) => (
            <i key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
      <div className="panel">
        <h2>Favorite Maps</h2>
        <div className="tag-list">{user.preferredMaps.map((map) => <span key={map}>{map}</span>)}</div>
      </div>
      <div className="panel">
        <h2>Favorite Civilizations</h2>
        <div className="tag-list">{user.favoriteCivilizations.map((civ) => <span key={civ}>{civ}</span>)}</div>
      </div>
    </section>
  );
}
