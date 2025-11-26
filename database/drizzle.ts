import config from "@/lib/config";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import * as schema from "./schema";

// Create a Neon connection pool
const pool = new Pool({
  connectionString: config.env.databaseUrl,
});

// Drizzle client with schema for full typing
const db = drizzle(pool, { schema });

export default db;
