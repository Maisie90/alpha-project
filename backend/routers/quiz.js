const { Router } = require('express');
const quizController = require('../controllers/quiz');
const quizRouter = Router()

quizRouter.get('/quiz', quizController.getAllQuizzes)
quizRouter.get('/quiz/:id', quizController.getQuizById)
quizRouter.post('/quiz', quizController.createQuestion)
quizRouter.delete('/quiz/:id', quizController.removeQuestion)

module.exports = quizRouter