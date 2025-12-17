DROP TYPE IF EXISTS "public"."user_role";--> statement-breakpoint
DROP TABLE IF EXISTS "answers";--> statement-breakpoint
DROP TABLE IF EXISTS "questions";--> statement-breakpoint
DROP TABLE IF EXISTS "users";--> statement-breakpoint
--> statement-breakpoint

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
--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;