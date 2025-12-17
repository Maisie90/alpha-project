const Quiz = require("../models/Quiz")

const getAllQuizzes = async (req, res) => {
  try {
    console.log("running getAllQuizzes from quiz controller")
    const questions = await Quiz.getAllQuestionsAndAnswers()
    console.log("success getAllQuizzes from quiz controller")
    res.status(200).json(questions)
  } catch (error) {
    console.log("error in getAllQuizzes from quiz controller", error.message)
    res
      .status(500)
      .json({ message: "Error Fetching Quizzes", error: error.message })
  }
}

const getQuizById = async (req, res) => {
  try {
    const { id } = req.params
    const questions = await Quiz.getOneQuestion(id)

    if (!questions) {
      return res.status(404).json({ message: "Question not found" })
    }
    res.status(200).json(questions)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Question", error: error.message })
  }
}

const removeQuestion = async (req, res) => {
  try {
    const { id } = req.params
    await Quiz.deleteQuestion(id)
    res.status(204).json({ message: "Question Deleted" })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Deleting Question", error: error.message })
  }
}

const createQuestion = async (req, res) => {
  try {
    console.log("running createQuestion from quiz controller")
    const questionText = req.body.question_text
    const answers = req.body.answers

    if (!questionText) {
      return res.status(400).json({ message: "Missing question_text" })
    }

    if (!answers) {
      return res
        .status(400)
        .json({ message: "Missing answers" })
    }
    if (answers.length != 4) {
      return res
        .status(400)
        .json({ message: "There must be exactly 4 answer choices" })
    }

    const newQuestion = await Quiz.addQuestion(questionText, answers)
    res.status(201).json({ message: "Question added", data: newQuestion })
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to add question", error: error.message })
  }
}

module.exports = {
  getAllQuizzes,
  getQuizById,
  removeQuestion,
  createQuestion,
}
