import { pgTable, integer, text, foreignKey, char, boolean, unique, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { relations } from "drizzle-orm/relations";
import { questions, answers } from "../schemas";

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

export const answersRelations = relations(answers, ({one}) => ({
    question: one(questions, {
        fields: [answers.questionId],
        references: [questions.id]
    }),
}));