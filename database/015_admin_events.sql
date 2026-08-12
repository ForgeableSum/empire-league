CREATE TABLE admin_events (
  id CHAR(36) PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  player_id VARCHAR(64) NULL,
  player_name VARCHAR(100) NULL,
  context_type VARCHAR(30) NULL,
  context_id VARCHAR(64) NULL,
  message VARCHAR(500) NOT NULL,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX idx_admin_events_type_created (event_type, created_at),
  CONSTRAINT fk_admin_events_player FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE SET NULL
);
