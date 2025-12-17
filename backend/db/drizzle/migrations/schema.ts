import { pgTable, integer, text, foreignKey, char, boolean, unique, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const userRole = pgEnum("user_role", ['student', 'teacher'])


export const questions = pgTable("questions", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "questions_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	questionText: text("question_text").notNull(),
});

export const answers = pgTable("answers", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "answers_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	questionId: integer("question_id").notNull(),
	answerText: text("answer_text").notNull(),
	option: char({ length: 1 }).notNull(),
	correctAnswer: boolean("correct_answer").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.questionId],
			foreignColumns: [questions.id],
			name: "answers_question_id_fkey"
		}),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	username: text().notNull(),
	name: text().notNull(),
	role: userRole().notNull(),
	imageUrl: text(),
	deletedAt: timestamp({ withTimezone: true, mode: 'string' }),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	password: text().notNull(),
}, (table) => [
	unique("users_username_key").on(table.username),
]);
