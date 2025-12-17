const request = require("supertest")
const app = require("../../../backend/app")
const { resetTestDB } = require("../../local-database/local-config")


describe("Quiz Router Endpoints", () => {
  test("GET /api/quizzes/quiz should return all quizzes", async () => {
    const res = await request(app).get("/quizzes/quiz")
    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
  test("GET /api/quizzes/quiz should return all quizzes", async () => {
    const res = await request(app).get("/quizzes/quiz/3")
    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
  test("POST /api/quizzes/quiz should return all quizzes", async () => {
    const data = {
      question_text: "What is the capital of France?",
      answers: [
        {
          option: "a",
          answer_text: "answer a text",
          correct_answer: true,
        },
        {
          option: "b",
          answer_text: "answer b text",
          correct_answer: false,
        },
        {
          option: "c",
          answer_text: "answer c text",
          correct_answer: false,
        },
        {
          option: "d",
          answer_text: "answer d text",
          correct_answer: false,
        },
      ],
    }
    const res = await request(app).post("/quizzes/quiz").send(data)
    expect(res.statusCode).toEqual(201)
    expect(res.body.message).toBe("Question added")
  })

  test("DELETE /api/quizzes/quiz should delete quizzes", async () => {
    const data = {
      question_text: "What is the capital of France?",
      answers: [
        {
          option: "a",
          answer_text: "answer a text",
          correct_answer: true,
        },
        {
          option: "b",
          answer_text: "answer b text",
          correct_answer: false,
        },
        {
          option: "c",
          answer_text: "answer c text",
          correct_answer: false,
        },
        {
          option: "d",
          answer_text: "answer d text",
          correct_answer: false,
        },
      ],
    }
    await request(app).post("/quizzes/quiz").send(data)
    const res = await request(app).delete("/quizzes/quiz/1")
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toBe("Question Deleted")
  })
})
