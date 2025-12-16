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

  describe("GET /users", () => {
    it("should return all users with a status code 200", async () => {
      const response = await request(api).get("/users")

      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body.length).toBeGreaterThan(0)
    })
  })

  describe("POST /users/register", () => {
    it("should create a new user and return it with a status code 201", async () => {
      const newUser = {
        username: "testuser",
        password: "testpassword",
        name: "Test User",
        role: "student",
      }
      const response = await request(api).post("/users/register").send(newUser)
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty("username", "testuser")
      expect(response.body).toHaveProperty("name", "Test User")
      expect(response.body).toHaveProperty("role", "student")
      expect(response.body).toHaveProperty("password", expect.any(String))
      expect(response.body.password).not.toBe("testpassword")
    })
    it("should return a 400 if required fields are missing", async () => {
      const incompleteUser = {
        username: "testuser",
      }
      const response = await request(api).post("/users/register").send(incompleteUser)
      expect(response.status).toBe(400)
      expect(response.body.error).toBe("Username, password, name, and role are required.")
    })
  })
})
