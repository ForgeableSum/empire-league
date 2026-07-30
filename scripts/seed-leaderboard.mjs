import { database } from "../src/database.mjs";

const playerCount = 350;
const idPrefix = "leaderboard-test-";
const countries = ["US", "CA", "GB", "DE", "FR", "BR", "PL", "SE", "JP", "KR"];

try {
  if (process.argv.includes("--remove")) {
    const [result] = await database.execute("DELETE FROM players WHERE id LIKE ?", [`${idPrefix}%`]);
    console.log(`[leaderboard-seed] Removed ${result.affectedRows} test players.`);
  } else {
    const connection = await database.getConnection();
    try {
      await connection.beginTransaction();
      for (let index = 1; index <= playerCount; index += 1) {
        const rating = 350 + ((index * 37) % 2200);
        const wins = 10 + ((index * 17) % 600);
        const losses = 8 + ((index * 11) % 450);
        const streakDirection = index % 3 === 0 ? -1 : 1;
        const streak = streakDirection * (index % 8);
        await connection.execute(
          `INSERT INTO players
            (id, display_name, country_code, rating, peak_rating, team_rating, team_peak_rating,
             wins, losses, streak)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             display_name = VALUES(display_name),
             country_code = VALUES(country_code),
             rating = VALUES(rating),
             peak_rating = VALUES(peak_rating),
             team_rating = VALUES(team_rating),
             team_peak_rating = VALUES(team_peak_rating),
             wins = VALUES(wins),
             losses = VALUES(losses),
             streak = VALUES(streak)`,
          [
            `${idPrefix}${String(index).padStart(3, "0")}`,
            `Test Player ${String(index).padStart(3, "0")}`,
            countries[(index - 1) % countries.length],
            rating,
            rating + 40 + (index % 90),
            Math.max(300, rating - 75 + (index % 150)),
            rating + 65 + (index % 100),
            wins,
            losses,
            streak
          ]
        );
      }
      await connection.commit();
      console.log(`[leaderboard-seed] Seeded ${playerCount} test players.`);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    const [rows] = await database.execute(
      "SELECT COUNT(*) AS total, MIN(rating) AS min_rating, MAX(rating) AS max_rating FROM players WHERE id LIKE ?",
      [`${idPrefix}%`]
    );
    console.log(
      `[leaderboard-seed] Verified ${rows[0].total} test players`
      + ` with ratings ${rows[0].min_rating}–${rows[0].max_rating}.`
    );
  }
} finally {
  await database.end();
}
