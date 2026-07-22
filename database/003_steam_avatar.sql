ALTER TABLE players ADD COLUMN avatar_url VARCHAR(500) NULL AFTER display_name;

INSERT INTO schema_migrations (version) VALUES ('003_steam_avatar');
