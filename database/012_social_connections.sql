CREATE TABLE IF NOT EXISTS social_connections (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  player_one_id VARCHAR(64) NOT NULL,
  player_two_id VARCHAR(64) NOT NULL,
  requested_by_id VARCHAR(64) NOT NULL,
  status ENUM('pending', 'accepted') NOT NULL DEFAULT 'pending',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_social_player_one FOREIGN KEY (player_one_id) REFERENCES players(id) ON DELETE CASCADE,
  CONSTRAINT fk_social_player_two FOREIGN KEY (player_two_id) REFERENCES players(id) ON DELETE CASCADE,
  CONSTRAINT fk_social_requested_by FOREIGN KEY (requested_by_id) REFERENCES players(id) ON DELETE CASCADE,
  CONSTRAINT chk_social_distinct_players CHECK (player_one_id <> player_two_id),
  UNIQUE KEY uq_social_pair (player_one_id, player_two_id),
  INDEX idx_social_player_two (player_two_id, status)
);

INSERT IGNORE INTO schema_migrations (version) VALUES ('012_social_connections');
