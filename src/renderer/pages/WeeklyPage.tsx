import { CalendarDays, Check, Clock3, Shield, Sparkles, Swords, Users } from "lucide-react";
import { useMemo, useState } from "react";

type WeeklyMode = {
  name: string;
  shortName: string;
  description: string;
  details: string[];
};

const weeklyModes: WeeklyMode[] = [
  {
    name: "FFA Nomad",
    shortName: "Nomad",
    description: "No town center. No teammates. Find your footing, claim the wilds, and outlast every rival.",
    details: ["8 players", "Free for all", "Nomad start"]
  },
  {
    name: "CBA",
    shortName: "CBA",
    description: "The classic Castle Blood Automatic scenario. Break enemy gates and earn stronger units with every raze.",
    details: ["4v4", "Scenario", "Fast action"]
  },
  {
    name: "FFA Arena",
    shortName: "Arena",
    description: "Eight kingdoms begin behind stone walls. Boom in peace, then decide exactly when to strike.",
    details: ["8 players", "Free for all", "Arena"]
  }
];

const rotationAnchor = new Date("2026-07-27T00:00:00");
const weekMs = 7 * 24 * 60 * 60 * 1000;

function rotationIndex(date: Date): number {
  const elapsedWeeks = Math.floor((date.getTime() - rotationAnchor.getTime()) / weekMs);
  return ((elapsedWeeks % weeklyModes.length) + weeklyModes.length) % weeklyModes.length;
}

export function WeeklyPage() {
  const [queued, setQueued] = useState(false);
  const rotation = useMemo(() => {
    const index = rotationIndex(new Date());
    return [0, 1, 2].map((offset) => weeklyModes[(index + offset) % weeklyModes.length]);
  }, []);
  const current = rotation[0];

  return (
    <section className="weekly-page">
      <div className="weekly-hero">
        <div className="weekly-hero-copy">
          <span className="weekly-kicker"><Sparkles size={14} /> This week’s game</span>
          <h2>{current.name}</h2>
          <p>{current.description}</p>
          <div className="weekly-mode-details">
            {current.details.map((detail, index) => (
              <span key={detail}>{index === 0 ? <Users size={15} /> : index === 1 ? <Swords size={15} /> : <Shield size={15} />}{detail}</span>
            ))}
          </div>
        </div>
        <div className="weekly-queue-card">
          <span>Just for fun</span>
          <strong>Unranked · Weekly rules</strong>
          <button className={queued ? "weekly-join queued" : "weekly-join"} type="button" onClick={() => setQueued((value) => !value)}>
            {queued ? <Check size={18} /> : <Swords size={18} />}
            {queued ? "Leave queue" : "Join weekly queue"}
          </button>
          <small>{queued ? "Searching for fellow challengers…" : "Ratings are not affected"}</small>
        </div>
      </div>

      <div className="weekly-heading">
        <div>
          <span className="eyebrow">Three-week rotation</span>
          <h2>On the horizon</h2>
        </div>
        <span className="weekly-reset"><Clock3 size={15} /> Changes every Monday</span>
      </div>

      <div className="weekly-rotation" aria-label="Weekly game rotation">
        {rotation.map((mode, index) => (
          <article className={index === 0 ? "weekly-rotation-card current" : "weekly-rotation-card"} key={mode.name}>
            <div className="weekly-week-marker"><span>{index === 0 ? "Now" : `0${index + 1}`}</span></div>
            <div className="weekly-card-copy">
              <span className="weekly-timing">{index === 0 ? "Playing this week" : index === 1 ? "Next week" : "In 2 weeks"}</span>
              <h3>{mode.name}</h3>
              <p>{mode.description}</p>
              <div className="weekly-card-tags">{mode.details.map((detail) => <span key={detail}>{detail}</span>)}</div>
            </div>
            {index < rotation.length - 1 && <div className="weekly-connector" aria-hidden="true" />}
          </article>
        ))}
      </div>

      <div className="weekly-note"><CalendarDays size={18} /><p><strong>Same time, different battlefield.</strong> The weekly queue rotates automatically through Nomad, CBA, and Arena. No Elo, no pressure. Just a change of pace.</p></div>
    </section>
  );
}
