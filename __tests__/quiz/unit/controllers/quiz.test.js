const {
  getAllQuizzes,
  getQuizById,
  removeQuestion,
  createQuestion,
} = require("../../../../backend/controllers/quiz")

const Quiz = require("../../../../backend/models/Quiz")

// Mock the entire Quiz model
jest.mock("../../../../backend/models/Quiz")

describe("Quiz Controller (Unit Tests)", () => {
  let req, res

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("getAllQuizzes", () => {
    it("responds with 200 and quiz data", async () => {
      const mockQuizzes = [{ id: 1 }]
      Quiz.getAllQuestionsAndAnswers.mockResolvedValue(mockQuizzes)

      await getAllQuizzes(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(mockQuizzes)
    })

    it("responds with 500 on error", async () => {
      Quiz.getAllQuestionsAndAnswers.mockRejectedValue(
        new Error("DB error")
      )

      await getAllQuizzes(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        message: "Error Fetching Quizzes",
        error: "DB error",
      })
    })
  })

  describe("getQuizById", () => {
    it("responds with 200 when quiz exists", async () => {
      req.params.id = "1"
      Quiz.getOneQuestion.mockResolvedValue([{ id: 1 }])

      await getQuizById(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith([{ id: 1 }])
    })

    it("responds with 404 when quiz does not exist", async () => {
      req.params.id = "99"
      Quiz.getOneQuestion.mockResolvedValue(null)

      await getQuizById(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({
        message: "Question not found",
      })
    })

    it("responds with 500 on error", async () => {
      req.params.id = "1"
      Quiz.getOneQuestion.mockRejectedValue(
        new Error("Error")
      )

      await getQuizById(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        message: "Error Fetching Question",
        error: "Error",
      })
    })
  })

  describe("removeQuestion", () => {
    it("responds with 204 when deleted", async () => {
      req.params.id = "5"
      Quiz.deleteQuestion.mockResolvedValue(true)

      await removeQuestion(req, res)

      expect(res.status).toHaveBeenCalledWith(204)
      expect(res.json).toHaveBeenCalledWith({
        message: "Question Deleted",
      })
    })

    it("responds with 500 on error", async () => {
      req.params.id = "5"
      Quiz.deleteQuestion.mockRejectedValue(
        new Error("Delete failed")
      )

      await removeQuestion(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        message: "Error Deleting Question",
        error: "Delete failed",
      })
    })
  })

  describe("createQuestion", () => {
    it("responds with 201 on successful creation", async () => {
      req.body = {
        question_text: "What is 2 + 2?",
        answers: [{}, {}, {}, {}],
      }

      Quiz.addQuestion.mockResolvedValue(1)

      await createQuestion(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        message: "Question added",
        data: 1,
      })
    })

    it("responds with 400 if question_text missing", async () => {
      req.body = { answers: [{}, {}, {}, {}] }

      await createQuestion(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        message: "Missing question_text",
      })
    })

    it("responds with 400 if answers missing", async () => {
      req.body = { question_text: "Test" }

      await createQuestion(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        message: "Missing answers",
      })
    })

    it("responds with 400 if answers length is not 4", async () => {
      req.body = {
        question_text: "Test",
        answers: [{}, {}, {}],
      }

      await createQuestion(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        message: "There must be exactly 4 answer choices",
      })
    })

    it("responds with 400 if model throws error", async () => {
      req.body = {
        question_text: "Test",
        answers: [{}, {}, {}, {}],
      }

      Quiz.addQuestion.mockRejectedValue(
        new Error("Insert failed")
      )

      await createQuestion(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to add question",
        error: "Insert failed",
      })
    })
  })
})
