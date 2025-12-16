const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.querySelector("input[name='username']").value;
    const password = document.querySelector("input[name='password']").value;

    if (!username || !password) {
        alert("Please enter a username and password");
        return;
    }

    let role = "student";

    if (username.toLowerCase() === "teacher") {
        role = "teacher";
    }

    const user = {
        username: username,
        role: role
    };

    localStorage.setItem("user", JSON.stringify(user));

    if (role === "teacher") {
        window.location.href = "teacher.html";
    } else {
        window.location.href = "challenge.html";
    }
});