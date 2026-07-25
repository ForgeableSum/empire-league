CREATE TABLE IF NOT EXISTS schema_migrations (
  version VARCHAR(100) PRIMARY KEY,
  applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS players (
  id VARCHAR(64) PRIMARY KEY,
  aoe_profile_id BIGINT UNSIGNED NOT NULL UNIQUE,
  display_name VARCHAR(100) NOT NULL,
  country_code CHAR(3) NULL,
  rating INT NOT NULL DEFAULT 1000,
  peak_rating INT NOT NULL DEFAULT 1000,
  wins INT UNSIGNED NOT NULL DEFAULT 0,
  losses INT UNSIGNED NOT NULL DEFAULT 0,
  streak INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_players_rating (rating DESC)
);

CREATE TABLE IF NOT EXISTS matches (
  id VARCHAR(64) PRIMARY KEY,
  queue_id VARCHAR(64) NOT NULL,
  host_player_id VARCHAR(64) NOT NULL,
  guest_player_id VARCHAR(64) NOT NULL,
  selected_map_id VARCHAR(64) NOT NULL,
  selected_map_name VARCHAR(100) NOT NULL,
  status ENUM('found', 'accepted', 'declined', 'lobby_ready', 'in_game', 'completed', 'cancelled') NOT NULL DEFAULT 'found',
  created_at DATETIME(3) NOT NULL,
  completed_at DATETIME(3) NULL,
  CONSTRAINT fk_matches_host FOREIGN KEY (host_player_id) REFERENCES players(id),
  CONSTRAINT fk_matches_guest FOREIGN KEY (guest_player_id) REFERENCES players(id),
  INDEX idx_matches_host (host_player_id, created_at DESC),
  INDEX idx_matches_guest (guest_player_id, created_at DESC)
);

CREATE TABLE IF NOT EXISTS match_results (
  match_id VARCHAR(64) PRIMARY KEY,
  winner_player_id VARCHAR(64) NULL,
  result ENUM('host_win', 'guest_win', 'no_contest') NOT NULL,
  verification_status ENUM('pending', 'verified', 'rejected') NOT NULL DEFAULT 'pending',
  verified_at DATETIME(3) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_results_match FOREIGN KEY (match_id) REFERENCES matches(id),
  CONSTRAINT fk_results_winner FOREIGN KEY (winner_player_id) REFERENCES players(id)
);

CREATE TABLE IF NOT EXISTS rating_history (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  player_id VARCHAR(64) NOT NULL,
  match_id VARCHAR(64) NOT NULL,
  rating_before INT NOT NULL,
  rating_after INT NOT NULL,
  rating_change INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_rating_player FOREIGN KEY (player_id) REFERENCES players(id),
  CONSTRAINT fk_rating_match FOREIGN KEY (match_id) REFERENCES matches(id),
  UNIQUE KEY uq_rating_player_match (player_id, match_id),
  INDEX idx_rating_history_player (player_id, created_at DESC)
);

INSERT IGNORE INTO schema_migrations (version) VALUES ('001_initial_schema');
