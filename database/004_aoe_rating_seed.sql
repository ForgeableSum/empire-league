ALTER TABLE players
  ADD COLUMN aoe_rating_seed_attempted BOOLEAN NOT NULL DEFAULT FALSE AFTER aoe_profile_id,
  ADD COLUMN aoe_rating_seeded_at DATETIME(3) NULL AFTER aoe_rating_seed_attempted,
  ADD COLUMN aoe_initial_rating INT NULL AFTER aoe_rating_seeded_at;

INSERT INTO schema_migrations (version) VALUES ('004_aoe_rating_seed');
