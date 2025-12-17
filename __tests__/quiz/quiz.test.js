const request = require('supertest');
const app = require('../../backend/app');
// const Test = require('supertest/lib/test');

describe('Quiz Router Endpoints', () => {
    test('GET /api/quizzes/quiz should return all quizzes', async () => {
        const res = await request(app).get('/quizzes/quiz');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true)
    })
    test('GET /api/quizzes/quiz should return all quizzes', async () => {
        const res = await request(app).get('/quizzes/quiz/3');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true)
    })
    test('POST /api/quizzes/quiz should return all quizzes', async () => {
        const data =
        { "questionText" : "Which is longest river in the world?",
        "optionsAndAnswers":{
        "option" : ["A","B","C","D"],
        "answer_text":["Amazon","Nile","Yangtze","Mississippi"],
        "correct_answer" : [true,false,false,false]
        }
    };
        const res = await request(app).post('/quizzes/quiz')
        .send(data)
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toBe("Question added");
    })

    test('DELETE /api/quizzes/quiz should return all quizzes', async () => {
       /* const data =
        { "questionText" : "Which is longest river in the world?",
        "optionsAndAnswers":{
        "option" : ["A","B","C","D"],
        "answer_text":["Amazon","Nile","Yangtze","Mississippi"],
        "correct_answer" : [true,false,false,false]
        }
    };
        const resp = await request(app).post('/quizzes/quiz').send(data)
*/
        const res = await request(app).delete('/quizzes/quiz/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe("Question Deleted");
    })

})