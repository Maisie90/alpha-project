DROP TABLE IF EXISTS "answers";--> statement-breakpoint
DROP TABLE IF EXISTS "questions";--> statement-breakpoint
DROP TABLE IF EXISTS "users";--> statement-breakpoint
DROP TYPE IF EXISTS "public"."user_role";--> statement-breakpoint

CREATE TYPE "public"."user_role" AS ENUM('student', 'teacher');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"name" text NOT NULL,
	"role" "user_role" NOT NULL,
	"imageUrl" text,
	"deletedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "questions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"question_text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "answers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "answers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"question_id" integer NOT NULL,
	"answer_text" text NOT NULL,
	"option" char(1) NOT NULL,
	"correct_answer" boolean NOT NULL
);

INSERT INTO questions (question_text)
VALUES
('Which is the longest river in the world?'),
('Which UK city is known as the "Steel City"?'),
('Which desert is the largest in the world?'),
('Which country has the most natural lakes?'),
('What is the tallest mountain in Africa?');

INSERT INTO answers (question_id, answer_text, option, correct_answer)
VALUES
(1, 'Amazon', 'A', false),
(1, 'Nile', 'B', true),
(1, 'Yangtze', 'C', false),
(1, 'Mississippi', 'D', false),
(2, 'London', 'A', false),
(2, 'Sheffield', 'B', true),
(2, 'Manchester', 'C', false),
(2, 'Birmingham', 'D', false),
(3, 'Sahara', 'A', true),
(3, 'Gobi', 'B', false),
(3, 'Kalahari', 'C', false),
(3, 'Arabian', 'D', false),
(4, 'Canada', 'A', true),
(4, 'Brazil', 'B', false),
(4, 'Russia', 'C', false),
(4, 'USA', 'D', false),
(5, 'Kilimanjaro', 'A', true),
(5, 'Mount Kenya', 'B', false),
(5, 'Mount Elgon', 'C', false),
(5, 'Atlas Mountains', 'D', false);

--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE CASCADE ON UPDATE no action;