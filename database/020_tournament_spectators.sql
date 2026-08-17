ALTER TABLE tournament_matches
  ADD COLUMN spectator_uri VARCHAR(128) NULL AFTER game_match_id,
  ADD COLUMN game_started_at DATETIME(3) NULL AFTER spectator_uri;

INSERT INTO schema_migrations (version) VALUES ('020_tournament_spectators');
