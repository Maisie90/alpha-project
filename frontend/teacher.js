async function fetchQuestions() {
    const token = localStorage.getItem("token");

    console.log("JWT token:", token);

    if (!token) {
        questionText.textContent = "You are not logged in.";
        return;
    }

    try {
        const response = await fetch(
            "https://api.alpha-project.duckdns.org/quizzes/quiz",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("Response status:", response.status);

        if (!response.ok) {
            questionText.textContent = "Failed to load questions.";
            return;
        }

        const apiData = await response.json();
        console.log("API data:", apiData);

        if (!apiData || apiData.length === 0) {
            questionText.textContent = "No questions available.";
            return;
        }

        questions = groupQuestions(apiData);
        loadQuestion();

    } catch (error) {
        console.error("Fetch error:", error);
        questionText.textContent = "Failed to load questions.";
    }
}
