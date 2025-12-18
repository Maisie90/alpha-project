/**
 * @jest-environment jsdom
 */

const { shuffleArray, groupQuestions, fetchQuestions, loadQuestions } = require("../../../frontend/challenge");

describe("shuffleArray", () => {
    test("shuffles array and returns 4 values", () => {
        const arr = [1, 2, 3, 4];
        const shuffle=[...arr]
        
        shuffleArray(arr);
        expect (arr.length).toBe(4);
        expect (arr.sort()).toEqual(shuffle.sort())
    })
});

describe("groupQuestions", () => {
    test("returns an group of questions", () => {
        const input = [
           { question_id: 1,
            question: "what is capital of uk",
            answer_text: "london",
            correct_answer: "true" },
            {question_id: 1,
            question: "what is capital of uk",
            answer_text: "madrid",
            correct_answer: "false"}
        ]

        const result = groupQuestions(input)

        expect(result.length).toBe(1);
        expect(result[0].answers.length).toBe(2)
        expect(result[0].question_text).toBe("what is capital of uk")
        })
    });
    