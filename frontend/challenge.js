const questions = [
    {
        question_text: "What is the capital of France?",
        answers: [
            { answer_text: "Paris", correct_answer: true },
            { answer_text: "Rome", correct_answer: false },
            { answer_text: "Berlin", correct_answer: false },
            { answer_text: "Madrid", correct_answer: false }
        ]
    },
    {
        question_text: "Which continent is Brazil in?",
        answers: [
            { answer_text: "Europe", correct_answer: false },
            { answer_text: "Africa", correct_answer: false },
            { answer_text: "South America", correct_answer: true },
            { answer_text: "Asia", correct_answer: false }
        ]
    },
    {
        question_text: "What is the capital of Japan?",
        answers: [
            { answer_text: "Seoul", correct_answer: false },
            { answer_text: "Tokyo", correct_answer: true },
            { answer_text: "Beijing", correct_answer: false },
            { answer_text: "Bangkok", correct_answer: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let streak = 0;

const questionText = document.getElementById("question-text");
const form = document.querySelector("form");
const answerInputs = form.querySelectorAll("input[type='radio']");
const answerSpans = form.querySelectorAll("span");
const streakCount = document.getElementById("streak-count");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    questionText.textContent = currentQuestion.question_text;

    shuffleArray(currentQuestion.answers);

    currentQuestion.answers.forEach((answer, index) => {
        answerSpans[index].textContent = answer.answer_text;
        answerInputs[index].checked = false;
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let selectedIndex = -1;

    answerInputs.forEach((input, index) => {
        if (input.checked) {
            selectedIndex = index;
        }
    });

    if (selectedIndex === -1) {
        alert("Please select an answer");
        return;
    }

    const isCorrect =
        questions[currentQuestionIndex].answers[selectedIndex].correct_answer;

    if (isCorrect) {
        score++;
        streak++;
    } else {
        streak = 0;
    }

    streakCount.textContent = streak;

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionText.textContent =
            `Challenge complete! You scored ${score} out of ${questions.length}.`;
        form.style.display = "none";
    }
});

loadQuestion();