ALTER TABLE players
  ADD COLUMN result_conflict_count INT UNSIGNED NOT NULL DEFAULT 0 AFTER streak;

CREATE TABLE match_result_conflicts (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  match_id VARCHAR(64) NOT NULL,
  player_id VARCHAR(64) NOT NULL,
  opponent_player_id VARCHAR(64) NOT NULL,
  reason VARCHAR(500) NOT NULL,
  replay_metadata JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_result_conflict_match FOREIGN KEY (match_id) REFERENCES matches(id),
  CONSTRAINT fk_result_conflict_player FOREIGN KEY (player_id) REFERENCES players(id),
  CONSTRAINT fk_result_conflict_opponent FOREIGN KEY (opponent_player_id) REFERENCES players(id),
  UNIQUE KEY uq_result_conflict_match_player (match_id, player_id),
  INDEX idx_result_conflict_player (player_id, created_at DESC),
  INDEX idx_result_conflict_opponent (opponent_player_id, created_at DESC)
);

INSERT INTO schema_migrations (version) VALUES ('005_result_conflicts');
