import { Clock, Search, ShieldCheck, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { LobbyPreparation } from "../components/match/LobbyPreparation";
import { ActiveMatch } from "../components/match/ActiveMatch";
import { ResultScreen } from "../components/match/ResultScreen";
import { useAppStore } from "../state/appStore";

export function QueuePage() {
  const { state, queues, startQueue, cancelQueue, clearError } = useAppStore();
  const [elapsed, setElapsed] = useState(0);

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
          {queues.map((queue, index) => (
            <article className={index === 0 ? "queue-card primary-queue" : "queue-card"} key={queue.id}>
              <div className="queue-heading">
                <ShieldCheck size={22} />
                <div>
                  <h2>{queue.name}</h2>
                  <span>{queue.ranked ? "Ranked" : "Prototype"}</span>
                </div>
              </div>
              <p>{queue.description}</p>
              <div className="queue-stats">
                <span><Search size={16} /> {queue.playersSearching} searching</span>
                <span><Clock size={16} /> {queue.estimatedWaitSeconds}s wait</span>
              </div>
              <div className="tag-list">{queue.mapPool.slice(0, 6).map((map) => <span key={map.id}>{map.name}</span>)}</div>
              <button className={index === 0 ? "primary" : "secondary"} type="button" onClick={() => void startQueue(queue)}>
                <Search size={18} /> Search
              </button>
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
