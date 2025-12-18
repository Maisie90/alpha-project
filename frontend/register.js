

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password"),
            name: form.get("name"),
            role: form.get("role")
        })
    }

    const response = await fetch("https://api.alpha-project.duckdns.org/users/register", options);
    const data = await response.json();

    if (response.status == 201) {
        alert("Registration successful! Please log in.");
        window.location.assign("index.html");
    } else {
        alert(data.error);
    }
})