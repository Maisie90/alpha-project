const Goat = require('../../../models/Goat')
const db = require('../../../database/connect')

// Mock the db module
jest.mock("../../../../backend/db/connect", () => ({
  query: jest.fn(),
}))

describe("Quiz Model", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("getAllQuestionsAndAnswers", () => {
    it("should return an array of Quiz instances", async () => {
      db.query.mockResolvedValue({
        rows: [
          {
            id: 1,
            question_id: 1,
            question_text: "What is 2 + 2?",
            option: "A",
            answer_text: "4",
            correct_answer: true,
          },
          {
            id: 2,
            question_id: 1,
            question_text: "What is 2 + 2?",
            option: "B",
            answer_text: "5",
            correct_answer: false,
          },
        ],
      })

      const result = await Quiz.getAllQuestionsAndAnswers()

      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM questions AS q JOIN answers AS a ON q.id = a.question_id ORDER BY q.id;"
      )

      expect(result).toHaveLength(2)
      expect(result[0]).toBeInstanceOf(Quiz)
      expect(result[0].question).toBe("What is 2 + 2?")
    })
  })

  describe("getOneQuestion", () => {
    it("should return null if no question exists", async () => {
      db.query.mockResolvedValue({ rows: [] })

      const result = await Quiz.getOneQuestion(999)

      expect(result).toBeNull()
    })

    it("should return an array of Quiz instances for a valid question", async () => {
      db.query.mockResolvedValue({
        rows: [
          {
            id: 1,
            question_id: 1,
            question_text: "What is the capital of France?",
            option: "A",
            answer_text: "Paris",
            correct_answer: true,
          },
        ],
      })

      const result = await Quiz.getOneQuestion(1)

      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM questions AS q JOIN answers AS a ON q.id = a.question_id WHERE q.id = $1;",
        [1]
      )

      expect(result).toHaveLength(1)
      expect(result[0]).toBeInstanceOf(Quiz)
      expect(result[0].answer_text).toBe("Paris")
    })
  })

  describe("addQuestion", () => {
    it("should insert a question and its answers and return the question ID", async () => {
      db.query
        .mockResolvedValueOnce({
          rows: [{ id: 10 }], // INSERT question
        })
        .mockResolvedValueOnce({}) // INSERT answer 1
        .mockResolvedValueOnce({}) // INSERT answer 2

      const questionText = "What is 3 + 3?"
      const answers = [
        { option: "A", answer_text: "6", correct_answer: true },
        { option: "B", answer_text: "7", correct_answer: false },
      ]

      const result = await Quiz.addQuestion(questionText, answers)

      expect(result).toBe(10)
      expect(db.query).toHaveBeenCalledTimes(3)
    })

    it("should throw an error if no answers are provided", async () => {
      await expect(
        Quiz.addQuestion("Invalid question", [])
      ).rejects.toThrow("No answers provided")
    })
  })

  describe("deleteQuestion", () => {
    it("should delete answers and question and return true", async () => {
      db.query.mockResolvedValue({})

      const result = await Quiz.deleteQuestion(5)

      expect(db.query).toHaveBeenNthCalledWith(
        1,
        "DELETE FROM answers WHERE question_id = $1;",
        [5]
      )

      expect(db.query).toHaveBeenNthCalledWith(
        2,
        "DELETE FROM questions WHERE id = $1;",
        [5]
      )

      expect(result).toBe(true)
    })

    it("should throw an error if deletion fails", async () => {
      db.query.mockRejectedValue(new Error("DB error"))

      await expect(Quiz.deleteQuestion(5)).rejects.toThrow("DB error")
    })
  })
})
