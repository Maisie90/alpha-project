const { Router } = require('express')
const quizController = require('../controllers/quiz')
const quizRouter = Router()

quizRouter.get('/quiz', quizController.getAllQuestions)
quizRouter.get('/quiz/:id', quizController.getOneQuestion)
quizRouter.post('/quiz', quizController.addQuestion)
quizRouter.delete('/quiz/:id', quizController.deleteQuestion)

module.exports = quizRouter