const request = require("supertest")
const app = require("../../../backend/app")
const { resetTestDB } = require("./config")

describe("User API Endpoints", () => {
  let api

  beforeEach(async () => {
    await resetTestDB()
  })

  beforeAll(() => {
    api = app.listen(4000, () => {
      console.log("Test server running on port 4000")
    })
  })

  afterAll((done) => {
    console.log("Gracefully closing server")
    api.close(done)
  })

  describe("GET /", () => {
    it("responds to GET / with a message and a description", async () => {
      const response = await request(api).get("/")

      expect(response.statusCode).toBe(200)
      expect(response.text).toBe("Server is Running")
    })
  })
  
})
