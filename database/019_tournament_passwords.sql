ALTER TABLE tournaments
  ADD COLUMN password_hash VARCHAR(128) NULL AFTER map_name,
  ADD COLUMN password_salt VARCHAR(64) NULL AFTER password_hash;

INSERT INTO schema_migrations (version) VALUES ('019_tournament_passwords');
