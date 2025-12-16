const Quiz = require('../models/Quiz');

const getAllQuizzes = async (req, res) => {

    try{
        const questions = await Quiz.getAllQuestionsAndAnswers();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({message : "Error Fetching Quizzes", error : error.message});
    };
};

const getQuizById = async (req, res) => {
    try {
        const {id} = req.params;
        const questions = await Quiz.getOneQuestion(id);

        if (!questions){
            return res.status(404).json({message:"Question not found"});
        }
        res.status(200).json(questions);

    } catch (error) {
        res.status(500).json({message:"Error Fetching Question", error:error.message});
    }
};


const removeQuestion = async (req, res) => {
    try {
        const {id} = req.params;
        await Quiz.deleteQuestion(id);
        res.status(200).json({message:"Question Deleted"});

    } catch (error) {
        res.status(500).json({message:"Error Deleting Question", error:error.message});
    }
};

const createQuestion = async (req, res) => {
    try {
        const newQuestion = await Quiz.addQuestion(req.body);
        res.status(201).json({message:"Question added", data:newQuestion});
    } catch(error) {
        res.status(400).json({message:'Failed to add question', error:error.message})
    }
};

module.exports = {
    getAllQuizzes,
    getQuizById,
    removeQuestion,
    createQuestion
    
};
    
