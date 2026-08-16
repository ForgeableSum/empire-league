CREATE TABLE tournaments (
  id VARCHAR(64) PRIMARY KEY,
  creator_player_id VARCHAR(64) NOT NULL,
  name VARCHAR(64) NOT NULL,
  format ENUM('single_elimination') NOT NULL DEFAULT 'single_elimination',
  civilization_mode ENUM('pick', 'random') NOT NULL,
  participant_capacity SMALLINT UNSIGNED NOT NULL,
  minimum_elo INT UNSIGNED NOT NULL DEFAULT 0,
  map_id VARCHAR(64) NOT NULL,
  map_name VARCHAR(100) NOT NULL,
  status ENUM('registration', 'started', 'completed', 'cancelled') NOT NULL DEFAULT 'registration',
  starts_at DATETIME(3) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_tournaments_creator FOREIGN KEY (creator_player_id) REFERENCES players(id),
  INDEX idx_tournaments_status_starts (status, starts_at),
  INDEX idx_tournaments_creator (creator_player_id, created_at DESC)
);

CREATE TABLE tournament_entries (
  tournament_id VARCHAR(64) NOT NULL,
  player_id VARCHAR(64) NOT NULL,
  bracket_slot SMALLINT UNSIGNED NOT NULL,
  rating_at_join INT NOT NULL,
  joined_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (tournament_id, player_id),
  UNIQUE KEY uq_tournament_bracket_slot (tournament_id, bracket_slot),
  CONSTRAINT fk_tournament_entries_tournament FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE,
  CONSTRAINT fk_tournament_entries_player FOREIGN KEY (player_id) REFERENCES players(id),
  INDEX idx_tournament_entries_player (player_id, joined_at DESC)
);

INSERT INTO schema_migrations (version) VALUES ('017_tournaments');
