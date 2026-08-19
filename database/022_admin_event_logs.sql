CREATE TABLE IF NOT EXISTS admin_event_logs (
  event_id CHAR(36) PRIMARY KEY,
  log_data MEDIUMBLOB NOT NULL,
  uncompressed_bytes INT UNSIGNED NOT NULL,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX idx_admin_event_logs_created (created_at),
  CONSTRAINT fk_admin_event_logs_event FOREIGN KEY (event_id) REFERENCES admin_events(id) ON DELETE CASCADE
);

INSERT INTO schema_migrations (version) VALUES ('022_admin_event_logs');
