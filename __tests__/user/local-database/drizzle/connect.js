import * as schema from "./schema.js"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config()

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
})

const db = drizzle(pool, { schema })

console.log("DB connection established.")

export default db