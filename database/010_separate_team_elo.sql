ALTER TABLE players
  ADD COLUMN team_wins INT UNSIGNED NOT NULL DEFAULT 0 AFTER losses,
  ADD COLUMN team_losses INT UNSIGNED NOT NULL DEFAULT 0 AFTER team_wins,
  ADD COLUMN team_streak INT NOT NULL DEFAULT 0 AFTER streak,
  ADD INDEX idx_players_team_rating (team_rating DESC);

ALTER TABLE rating_history
  ADD COLUMN rating_pool ENUM('solo', 'team') NOT NULL DEFAULT 'solo' AFTER match_id,
  ADD INDEX idx_rating_history_player_pool (player_id, rating_pool, created_at DESC);

INSERT INTO schema_migrations (version) VALUES ('010_separate_team_elo');
