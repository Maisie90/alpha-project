// username: student1
// password: password

// username: teacher1
// password: password

const loginForm = document.querySelector("form")

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault()

  const form = new FormData(event.target)

  //   const username = document.querySelector("input[name='username']").value
  //   const password = document.querySelector("input[name='password']").value

  if (!form.get("username") || !form.get("password")) {
    alert("Please enter a username and password")
    return
  }

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: form.get("username"),
      password: form.get("password"),
    }),
  }

  const response = await fetch("http://localhost:3000/users/login", options)
  const data = await response.json()

  if (response.status == 200) {
    localStorage.setItem("token", data.token)
    console.log(data)
    if (data.role === "teacher") {
      window.location.assign("teacher.html")
    } else {
      window.location.assign("challenge.html")
    }
  } else {
    alert(data.error)
  }

  // let role = "student";

  // if (username.toLowerCase() === "teacher") {
  //     role = "teacher";
  // }

  // const user = {
  //     username: username,
  //     role: role
  // };

  // localStorage.setItem("user", JSON.stringify(user));
})
