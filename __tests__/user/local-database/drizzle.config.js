const { defineConfig } = require("drizzle-kit")

module.exports = defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema.js",

  // where to output the generated migration files
  out: "./drizzle/migrations",

  // what this does: whenever we try to run migrations using drizzle, it'll tell us exactly what's happening and we have to confirm that we want to do things like delete columns etc.
  strict: true,
  verbose: true,

  dbCredentials: {
    // ssl false because we are doing this locally
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    ssl: false,
  },
})
