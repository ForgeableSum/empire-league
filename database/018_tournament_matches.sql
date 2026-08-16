ALTER TABLE tournaments
  ADD COLUMN started_at DATETIME(3) NULL AFTER starts_at,
  ADD COLUMN completed_at DATETIME(3) NULL AFTER started_at;

ALTER TABLE tournament_entries
  ADD COLUMN status ENUM('active', 'eliminated', 'withdrawn', 'no_show', 'winner') NOT NULL DEFAULT 'active' AFTER rating_at_join;

CREATE TABLE tournament_matches (
  id VARCHAR(64) PRIMARY KEY,
  tournament_id VARCHAR(64) NOT NULL,
  round_number SMALLINT UNSIGNED NOT NULL,
  match_position SMALLINT UNSIGNED NOT NULL,
  player_one_id VARCHAR(64) NULL,
  player_two_id VARCHAR(64) NULL,
  player_one_source_resolved BOOLEAN NOT NULL DEFAULT FALSE,
  player_two_source_resolved BOOLEAN NOT NULL DEFAULT FALSE,
  player_one_ready_at DATETIME(3) NULL,
  player_two_ready_at DATETIME(3) NULL,
  ready_deadline DATETIME(3) NULL,
  game_match_id VARCHAR(64) NULL,
  winner_player_id VARCHAR(64) NULL,
  status ENUM('pending', 'waiting', 'in_progress', 'completed', 'forfeit', 'bye', 'no_contest') NOT NULL DEFAULT 'pending',
  completed_at DATETIME(3) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  UNIQUE KEY uq_tournament_round_position (tournament_id, round_number, match_position),
  UNIQUE KEY uq_tournament_game_match (game_match_id),
  INDEX idx_tournament_matches_ready (status, ready_deadline),
  INDEX idx_tournament_matches_player_one (player_one_id, status),
  INDEX idx_tournament_matches_player_two (player_two_id, status),
  CONSTRAINT fk_tournament_matches_tournament FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE,
  CONSTRAINT fk_tournament_matches_player_one FOREIGN KEY (player_one_id) REFERENCES players(id),
  CONSTRAINT fk_tournament_matches_player_two FOREIGN KEY (player_two_id) REFERENCES players(id),
  CONSTRAINT fk_tournament_matches_winner FOREIGN KEY (winner_player_id) REFERENCES players(id)
);

INSERT INTO schema_migrations (version) VALUES ('018_tournament_matches');
