const form = document.querySelector("form")

async function ensureTeacher() {
  const token = localStorage.getItem("token")
  if (!token) {
    window.location.assign("../index.html")
    return
  }

  try {
    const res = await fetch("https://api.alpha-project.duckdns.org/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!res.ok) throw new Error("unauthorized")

    const data = await res.json()
    const role = data.role || data.roles || (data.user && data.user.role)

    if (Array.isArray(role)) {
      if (role.includes("teacher")) {
        showApp()
        return
      } else {
        window.location.assign("../forbidden.html")
        return
      }
    }

    if (role === "teacher") {
      showApp()
      return
    }

    window.location.assign("../forbidden.html")
  } catch (err) {
    console.error("Role verification failed", err)
    window.location.assign("../forbidden.html")
  }
}

;(async () => {
  await ensureTeacher()
})()

function showApp() {
  const overlay = document.getElementById("loader-overlay")
  if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay)
  const app = document.getElementById("teacher-app")
  if (app) app.style.display = ""
  const nav = document.getElementById("teacher-nav")
  if (nav) nav.style.display = ""
}

form.addEventListener("submit", async function (event) {
  event.preventDefault()

  const token = localStorage.getItem("token")
  if (!token) {
    window.location.assign("../index.html")
    return
  }

  const questionText = form.question.value.trim()

  const correctAnswer = form.correct_answer.value.trim()
  const wrongAnswer1 = form.wrong_answer_1.value.trim()
  const wrongAnswer2 = form.wrong_answer_2.value.trim()
  const wrongAnswer3 = form.wrong_answer_3.value.trim()

  if (
    !questionText ||
    !correctAnswer ||
    !wrongAnswer1 ||
    !wrongAnswer2 ||
    !wrongAnswer3
  ) {
    alert("Please fill in all fields")
    return
  }

  const payload = {
    question_text: questionText,
    answers: [
      {
        option: "a",
        answer_text: correctAnswer,
        correct_answer: true,
      },
      {
        option: "b",
        answer_text: wrongAnswer1,
        correct_answer: false,
      },
      {
        option: "c",
        answer_text: wrongAnswer2,
        correct_answer: false,
      },
      {
        option: "d",
        answer_text: wrongAnswer3,
        correct_answer: false,
      },
    ],
  }

  try {
    const response = await fetch(
      "https://api.alpha-project.duckdns.org/quizzes/quiz",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    )

    if (!response.ok) {
      const error = await response.json()
      console.error(error)
      alert("Failed to save question")
      return
    }

    alert("Question saved successfully")
    form.reset()
  } catch (error) {
    console.error(error)
    alert("Failed to save question")
  }
})
