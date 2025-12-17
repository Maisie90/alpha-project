const db = require("../db/connect")

class Quiz {
  constructor(id, question_id, question, option, answer_text, correct_answer) {
    this.id = id
    this.question_id = question_id
    this.question = question
    this.option = option
    this.answer_text = answer_text
    this.correct_answer = correct_answer
  }

  static async getAllQuestionsAndAnswers() {
    const result = await db.query(
      "SELECT * FROM questions AS q JOIN answers AS a ON q.id = a.question_id ORDER BY q.id;",
    )
    return result.rows.map(
      (row) =>
        new Quiz(
          row.id,
          row.question_id,
          row.question_text,
          row.option,
          row.answer_text,
          row.correct_answer,
        ),
    )
  }

  static async getOneQuestion(questionId) {
    const result = await db.query(
      "SELECT * FROM questions AS q JOIN answers AS a ON q.id = a.question_id WHERE q.id = $1;",
      [questionId],
    )
    if (result.rows.length === 0) {
      return null
    }
    return result.rows.map(
      (row) =>
        new Quiz(
          row.id,
          row.question_id,
          row.question_text,
          row.option,
          row.answer_text,
          row.correct_answer,
        ),
    )
  }

  static async addQuestion(questionText, optionsAndAnswers) {
    try {
      console.log("running addQuestion from quiz model")
      const insertQuestion = await db.query(
        "INSERT INTO questions (question_text) VALUES ($1) RETURNING id;",
        [questionText],
      )
      const questionId = insertQuestion.rows[0].id

      function normaliseAnswers(input) {
        if (!input) return []
        if (Array.isArray(input)) return input
        if (Array.isArray(input.answers)) return input.answers
        return []
      }

      const answers = normaliseAnswers(optionsAndAnswers)

      if (!answers.length) throw new Error('No answers provided')

      for (let i = 0; i < answers.length; i++) {
        const a = answers[i]
        let label
        if (a && a.option) {
          label = String(a.option).toUpperCase().charAt(0)
        } else {
          label = String.fromCharCode(65 + i)
        }
        const text = a.answer_text || ''
        const correct = !!a.correct_answer

        await db.query(
          "INSERT INTO answers (question_id, option, answer_text, correct_answer) VALUES ($1, $2, $3, $4);",
          [questionId, label, text, correct],
        )
      }
      console.log("success addQuestion from quiz model")
      return questionId
    } catch (error) {
      throw error
    }
  }

  static async deleteQuestion(questionId) {
    try {
      await db.query("DELETE FROM answers WHERE question_id = $1;", [
        questionId,
      ])
      await db.query("DELETE FROM questions WHERE id = $1;", [questionId])
      return true
    } catch (error) {
      console.error("Error deleting question:", error)
      throw error
    }
  }
}

module.exports = Quiz
