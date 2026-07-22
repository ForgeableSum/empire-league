import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";
import { database, databaseConfig } from "../src/database.mjs";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const migrationsDirectory = join(currentDirectory, "../database");
const connection = await mysql.createConnection({ ...databaseConfig, multipleStatements: true });

try {
  const files = (await readdir(migrationsDirectory)).filter((file) => file.endsWith(".sql")).sort();
  for (const file of files) {
    const version = file.replace(/\.sql$/, "");
    const [rows] = await connection.execute("SELECT version FROM schema_migrations WHERE version = ?", [version]);
    if (rows.length > 0) continue;
    await connection.query(await readFile(join(migrationsDirectory, file), "utf8"));
    console.log(`[database] Applied schema migration ${version}`);
  }
} finally {
  await connection.end();
  await database.end();
}
