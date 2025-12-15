import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../schemaHelpers"

export const userRoles = ["user", "admin"]
export const userRoleEnum = pgEnum("user_role", userRoles)

export const UserTable = pgTable("users", {
  id,
  username: text().notNull(),
  name: text().notNull(),
  role: userRoleEnum().notNull().default("user"),
  imageUrl: text(),
  deletedAt: timestamp({ withTimezone: true }),
  createdAt,
  updatedAt,
})