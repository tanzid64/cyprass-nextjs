import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../../migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

dotenv.config({
  path: ".env",
});

if (!process.env.DATABASE_URL) {
  console.log('Cannot find "DATABASE_URL" in .env');
}

const client = postgres(process.env.DATABASE_URL as string, {
  max: 1,
});

const db = drizzle(client, { schema });
const migratedb = async () => {
  try {
    console.log("Migrating database");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("Database migrated");
  } catch (error) {
    console.error("error in migrating db", error);
  }
};

migratedb();
export default db;
