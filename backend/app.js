const express = require("express")
const cors = require("cors")
const app = express()
const userRouter = require("./routers/user")
const quizRouter = require("./routers/quiz")
const logger = require("./middleware/logger");

//Middleware to log requests
app.use(logger);

//Middleware to parese JSON Bodies (Handling data from frontend)
app.use(express.json())
app.use(cors())

//check if backend is working
app.get("/", (req, res) => {
  res.status(200).send("Server is Running")
})

app.use("/users", userRouter)
app.use("/quizzes", quizRouter)

module.exports = app
