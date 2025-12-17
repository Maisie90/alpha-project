import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"
import dotenv from "dotenv"
dotenv.config()

export default defineConfig({
  schema: "./schemas.js",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL,
  },
})
