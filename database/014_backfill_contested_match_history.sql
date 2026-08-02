UPDATE matches m
JOIN (
  SELECT match_id, MIN(created_at) AS contested_at
  FROM match_result_conflicts
  GROUP BY match_id
) conflicts ON conflicts.match_id = m.id
SET m.status = 'completed',
    m.completed_at = COALESCE(m.completed_at, conflicts.contested_at);

INSERT INTO match_results
  (match_id, winner_player_id, result, verification_status, verified_at)
SELECT conflicts.match_id, NULL, 'no_contest', 'contested', conflicts.contested_at
FROM (
  SELECT match_id, MIN(created_at) AS contested_at
  FROM match_result_conflicts
  GROUP BY match_id
) conflicts
LEFT JOIN match_results existing ON existing.match_id = conflicts.match_id
WHERE existing.match_id IS NULL;

INSERT INTO schema_migrations (version) VALUES ('014_backfill_contested_match_history');
