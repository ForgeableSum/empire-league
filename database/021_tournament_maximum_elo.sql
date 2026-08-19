ALTER TABLE tournaments
  ADD COLUMN maximum_elo INT UNSIGNED NULL AFTER minimum_elo;

INSERT INTO schema_migrations (version) VALUES ('021_tournament_maximum_elo');
