import { ArrowRight, Trophy } from "lucide-react";
import { useEffect } from "react";
import { formatDivisionForRating } from "../../../shared/contracts/matchmaking";

interface PromotionModalProps {
  oldRating: number;
  newRating: number;
  onClose: () => void;
}

export function PromotionModal({ oldRating, newRating, onClose }: PromotionModalProps) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const oldRank = formatDivisionForRating(oldRating);
  const newRank = formatDivisionForRating(newRating);

  return (
    <div className="modal-backdrop promotion-backdrop" role="presentation">
      <section className="match-modal promotion-modal" role="alertdialog" aria-modal="true" aria-labelledby="promotion-title">
        <Trophy className="promotion-trophy" size={54} aria-hidden="true" />
        <span className="eyebrow">Rank promotion</span>
        <h2 id="promotion-title">Congratulations!</h2>
        <p>Your victory earned you a new rank.</p>
        <div className="promotion-ranks" aria-label={`Promoted from ${oldRank} to ${newRank}`}>
          <div>
            <span>Previous</span>
            <strong>{oldRank}</strong>
            <small>{oldRating} Elo</small>
          </div>
          <ArrowRight size={28} aria-hidden="true" />
          <div className="promotion-rank-new">
            <span>New rank</span>
            <strong>{newRank}</strong>
            <small>{newRating} Elo</small>
          </div>
        </div>
        <button className="primary" type="button" onClick={onClose} autoFocus>Continue</button>
      </section>
    </div>
  );
}
