ALTER TABLE matches
  ADD COLUMN host_civilization VARCHAR(100) NULL AFTER selected_map_name,
  ADD COLUMN guest_civilization VARCHAR(100) NULL AFTER host_civilization;

INSERT INTO schema_migrations (version) VALUES ('009_match_civilizations');
