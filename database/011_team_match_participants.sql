CREATE TABLE match_participants (
  match_id VARCHAR(64) NOT NULL,
  player_id VARCHAR(64) NOT NULL,
  lobby_slot TINYINT UNSIGNED NOT NULL,
  team_number TINYINT UNSIGNED NOT NULL,
  civilization VARCHAR(100) NULL,
  PRIMARY KEY (match_id, player_id),
  UNIQUE KEY uq_match_lobby_slot (match_id, lobby_slot),
  CONSTRAINT fk_match_participant_match FOREIGN KEY (match_id) REFERENCES matches(id),
  CONSTRAINT fk_match_participant_player FOREIGN KEY (player_id) REFERENCES players(id)
);

INSERT INTO schema_migrations (version) VALUES ('011_team_match_participants');
