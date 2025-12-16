const db = require("../db/connect");

class Quiz {
  constructor(id, question_id, question, option, answer_text, correct_answer) {
    this.id = id;
    this.question_id = question_id;
    this.question = question;
    this.option = option;
    this.answer_text = answer_text;
    this.correct_answer = correct_answer;
  }

  static async getAllQuestionsAndAnswers() {
    const result = await db.query(
      "SELECT q.id, question_text, option, answer_text, correct_answer FROM questions AS q JOIN answers AS a ON q.id = a.question_id ORDER BY q.id;"
    );
    return result.rows.map(
      (row) =>
        new Quiz(
          row.id,
          row.question_text,
          row.option,
          row.answer_text,
          row.correct_answer
        )
    );
  }

  static async getOneQuestion(questionId) {
    const result = await db.query(
      "SELECT q.id, question_text, option, answer_text, correct_answer FROM questions AS q JOIN answers AS a ON q.id = a.question_id WHERE q.id = $1;",
      [questionId]
    );
    if (result.rows.length === 0) {
      return null;
    }
    const row = result.rows[0];
    return new Quiz(
      row.q.id,
      row.question_text,
      row.option,
      row.answer_text,
      row.correct_answer
    );
  }

  static async addQuestion(questionText, optionsAndAnswers) {
    try {
      const insertQuestion = await db.query(
        "INSERT INTO questions (question_text) VALUES ($1) RETURNING id;",
        [questionText]
      );
      const questionId = insertQuestion.rows[0].id;
      const { option, answer_text, correct_answer } = optionsAndAnswers;
      for (let i = 0; i < option.length; i++) {
        await db.query(
          "INSERT INTO answers (question_id, option, answer_text, correct_answer) VALUES ($1, $2, $3, $4);",
          [questionId, option[i], answer_text[i], correct_answer[i]]
        );
      }
      return questionId;
    } catch (error) {
      console.error("Error adding question:", error);
      throw error;
    }
  }

  static async deleteQuestion(questionId) {
    try {
      await db.query("DELETE FROM answers WHERE question_id = $1;", [
        questionId,
      ]);
      await db.query("DELETE FROM questions WHERE id = $1;", [questionId]);
      return true;
    } catch (error) {
      console.error("Error deleting question:", error);
      throw error;
    }
  }
}

module.exports = Quiz;
