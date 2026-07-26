ALTER TABLE matches
  ADD COLUMN map_catalog_version INT UNSIGNED NULL AFTER selected_map_name,
  ADD COLUMN map_group_id VARCHAR(32) NULL AFTER map_catalog_version;

INSERT INTO schema_migrations (version) VALUES ('008_match_map_catalog');
