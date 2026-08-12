ALTER TABLE admin_events
  ADD COLUMN severity ENUM('info', 'warning', 'critical') NOT NULL DEFAULT 'critical' AFTER event_type,
  ADD COLUMN event_code VARCHAR(80) NULL AFTER severity,
  ADD COLUMN phase VARCHAR(80) NULL AFTER event_code,
  ADD INDEX idx_admin_events_severity_created (severity, created_at);

INSERT INTO schema_migrations (version) VALUES ('016_admin_event_classification');
