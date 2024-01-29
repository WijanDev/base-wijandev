import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/lib/modules/**/infrastructure/db/drizzle/*.schema.drizzle.ts",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.PUBLIC_SUPABASE_CONNECTION_STRING!
  }
} satisfies Config;