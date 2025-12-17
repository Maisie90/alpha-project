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
    console.log("running addQuestion in Quiz model")
    try {
      const insertQuestion = await db.query(
        "INSERT INTO questions (question_text) VALUES ($1) RETURNING id;",
        [questionText],
      )
      const questionId = insertQuestion.rows[0].id

      let answersArray = []

      if (Array.isArray(optionsAndAnswers)) {
        answersArray = optionsAndAnswers
      }
      else if (optionsAndAnswers && Array.isArray(optionsAndAnswers.answers)) {
        answersArray = optionsAndAnswers.answers
      }
      else if (
        optionsAndAnswers &&
        (Array.isArray(optionsAndAnswers.option) || Array.isArray(optionsAndAnswers.answer_text))
      ) {
        const opts = optionsAndAnswers.option || []
        const texts = optionsAndAnswers.answer_text || []
        const corrects = optionsAndAnswers.correct_answer || []
        const maxLength = Math.max(opts.length, texts.length, corrects.length)

        for (let i = 0; i < maxLength; i++) {
          answersArray.push({
            option: opts[i],
            answer_text: texts[i],
            correct_answer: corrects[i],
          })
        }
      } else {
        // Unsupported input shape — give a clear error for beginners
        throw new Error('Invalid answers format. Expect `answers` array or `option/answer_text/correct_answer` arrays.')
      }

      // 3) Insert each answer row. The DB expects a single-char `option` (A/B/C...)
      for (let i = 0; i < answersArray.length; i++) {
        const item = answersArray[i] || {}

        // Use provided option letter if present, otherwise generate A, B, C...
        const rawOption = item.option
        const label = rawOption
          ? String(rawOption).toUpperCase().slice(0, 1)
          : String.fromCharCode(65 + i)

        // Prefer explicit `answer_text`; fall back to `option` text if absent
        const answerText = item.answer_text ?? item.option ?? ''

        // Ensure boolean for correct_answer
        const isCorrect = !!item.correct_answer

        await db.query(
          "INSERT INTO answers (question_id, option, answer_text, correct_answer) VALUES ($1, $2, $3, $4);",
          [questionId, label, answerText, isCorrect],
        )
      }

      console.log("success addQuestion in Quiz model")
      return questionId
    } catch (error) {
      console.error("Error adding question:", error)
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
