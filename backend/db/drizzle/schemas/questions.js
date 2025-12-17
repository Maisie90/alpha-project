import { pgTable, integer, text, foreignKey, char, boolean, unique, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { relations } from "drizzle-orm/relations";
import { questions, answers } from "../schemas";

export const questions = pgTable("questions", {
    id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "questions_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
    questionText: text("question_text").notNull(),
});

export const questionsRelations = relations(questions, ({many}) => ({
    answers: many(answers),
}));