import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";
import { database, databaseConfig } from "../src/database.mjs";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const migrationPath = join(currentDirectory, "../database/001_initial_schema.sql");
const migration = await readFile(migrationPath, "utf8");
const connection = await mysql.createConnection({ ...databaseConfig, multipleStatements: true });

try {
  await connection.query(migration);
  console.log("[database] Applied schema migration 001_initial_schema");
} finally {
  await connection.end();
  await database.end();
}
