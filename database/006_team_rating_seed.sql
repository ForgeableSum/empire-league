ALTER TABLE players
  ADD COLUMN team_rating INT NOT NULL DEFAULT 1000 AFTER peak_rating,
  ADD COLUMN team_peak_rating INT NOT NULL DEFAULT 1000 AFTER team_rating,
  ADD COLUMN aoe_team_initial_rating INT NULL AFTER aoe_initial_rating;

INSERT INTO schema_migrations (version) VALUES ('006_team_rating_seed');
