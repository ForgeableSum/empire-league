ALTER TABLE players
  ADD COLUMN legacy_solo_wins INT UNSIGNED NOT NULL DEFAULT 0 AFTER aoe_team_initial_rating,
  ADD COLUMN legacy_solo_losses INT UNSIGNED NOT NULL DEFAULT 0 AFTER legacy_solo_wins,
  ADD COLUMN legacy_team_wins INT UNSIGNED NOT NULL DEFAULT 0 AFTER legacy_solo_losses,
  ADD COLUMN legacy_team_losses INT UNSIGNED NOT NULL DEFAULT 0 AFTER legacy_team_wins;

INSERT INTO schema_migrations (version) VALUES ('007_official_ladder_records');
