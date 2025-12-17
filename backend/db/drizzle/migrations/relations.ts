import { relations } from "drizzle-orm/relations";
import { questions, answers } from "./schema";

export const answersRelations = relations(answers, ({one}) => ({
	question: one(questions, {
		fields: [answers.questionId],
		references: [questions.id]
	}),
}));

export const questionsRelations = relations(questions, ({many}) => ({
	answers: many(answers),
}));