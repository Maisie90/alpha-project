let questions = [];
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

function groupQuestions(apiData) {
    const grouped = {};

    apiData.forEach(item => {
        if (!grouped[item.question_id]) {
            grouped[item.question_id] = {
                question_text: item.question,
                answers: []
            };
        }

        grouped[item.question_id].answers.push({
            answer_text: item.answer_text,
            correct_answer: item.correct_answer
        });
    });

    return Object.values(grouped);
}

async function fetchQuestions() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.assign("index.html");
        return;
    }

    const response = await fetch(
        "https://api.alpha-project.duckdns.org/quizzes/quiz",
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        }
    );

    const apiData = await response.json();
    questions = groupQuestions(apiData);
    loadQuestion();
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
        if (input.checked) selectedIndex = index;
    });

    if (selectedIndex === -1) return;

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
        const img1 = document.createElement('img'); 
        img1.src= frontend/assets/passport1.png; 
        imageContainer.innerHTML = ""; 
        imageContainer.appendChild(img1)
    }
});

fetchQuestions();