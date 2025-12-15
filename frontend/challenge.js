const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "Rome", "Berlin", "Madrid"],
        correctIndex: 0
    },
    {
        question: "Which continent is Brazil in?",
        answers: ["Europe", "Africa", "South America", "Asia"],
        correctIndex: 2
    },
    {
        question: "What is the capital of Japan?",
        answers: ["Seoul", "Beijing", "Bangkok", "Tokyo"],
        correctIndex: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const answerSpans = document.querySelectorAll("form span");
const form = document.querySelector("form");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    questionText.textContent = currentQuestion.question;

    answerSpans.forEach((span, index) => {
        span.textContent = currentQuestion.answers[index];
    });

    const checked = document.querySelector("input[name='answer']:checked");
    if (checked) checked.checked = false;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedAnswer = document.querySelector(
        "input[name='answer']:checked"
    );

    if (!selectedAnswer) {
        alert("Please select an answer");
        return;
    }

    const selectedIndex = Array.from(
        document.querySelectorAll("input[name='answer']")
    ).indexOf(selectedAnswer);

    if (selectedIndex === questions[currentQuestionIndex].correctIndex) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionText.textContent = `Challenge complete! You scored ${score} out of ${questions.length}.`;
        form.style.display = "none";
    }
});

loadQuestion();