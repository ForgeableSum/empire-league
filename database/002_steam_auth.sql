ALTER TABLE players
  MODIFY aoe_profile_id BIGINT UNSIGNED NULL,
  ADD COLUMN steam_id VARCHAR(20) NULL AFTER id,
  ADD UNIQUE KEY uq_players_steam_id (steam_id);

CREATE TABLE auth_login_attempts (
  id CHAR(36) PRIMARY KEY,
  poll_token_hash CHAR(64) NOT NULL,
  state_hash CHAR(64) NOT NULL,
  steam_id VARCHAR(20) NULL,
  status ENUM('pending', 'approved', 'consumed', 'expired') NOT NULL DEFAULT 'pending',
  expires_at DATETIME(3) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  consumed_at DATETIME(3) NULL,
  INDEX idx_auth_attempt_expiry (status, expires_at)
);

CREATE TABLE auth_sessions (
  id CHAR(36) PRIMARY KEY,
  player_id VARCHAR(64) NOT NULL,
  token_hash CHAR(64) NOT NULL UNIQUE,
  expires_at DATETIME(3) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_used_at DATETIME(3) NOT NULL,
  revoked_at DATETIME(3) NULL,
  CONSTRAINT fk_auth_sessions_player FOREIGN KEY (player_id) REFERENCES players(id),
  INDEX idx_auth_session_player (player_id, revoked_at, expires_at)
);

INSERT INTO schema_migrations (version) VALUES ('002_steam_auth');
