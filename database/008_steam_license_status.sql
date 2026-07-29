ALTER TABLE players
  ADD COLUMN steam_license_status ENUM('unknown', 'owned', 'family_shared') NOT NULL DEFAULT 'unknown' AFTER steam_id,
  ADD COLUMN steam_license_owner_id VARCHAR(20) NULL AFTER steam_license_status,
  ADD COLUMN steam_license_checked_at DATETIME(3) NULL AFTER steam_license_owner_id,
  ADD INDEX idx_players_steam_license_status (steam_license_status);

INSERT INTO schema_migrations (version) VALUES ('008_steam_license_status');
