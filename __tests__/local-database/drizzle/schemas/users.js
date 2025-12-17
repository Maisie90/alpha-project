import { pgEnum, pgTable, text } from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt, deletedAt } from "../schemaHelpers"

export const userRoles = ["student", "teacher"]
export const userRoleEnum = pgEnum("user_role", userRoles)

export const UserTable = pgTable(
  "users",
  {
    id,
    username: text().notNull().unique(),
    name: text().notNull(),
    role: userRoleEnum().notNull(),
    imageUrl: text(),
    deletedAt,
    createdAt,
    updatedAt,
    password: text().notNull(),
  },
)
