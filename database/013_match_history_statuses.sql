ALTER TABLE match_results
  MODIFY COLUMN result ENUM('host_win', 'guest_win', 'no_contest') NULL,
  MODIFY COLUMN verification_status ENUM('pending', 'verified', 'rejected', 'contested', 'no_contest')
    NOT NULL DEFAULT 'pending';

INSERT INTO schema_migrations (version) VALUES ('013_match_history_statuses');
