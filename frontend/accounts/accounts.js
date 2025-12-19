const logoutButton = document.getElementById("logout-button")
const loginLink = document.getElementById("login-link")
const registerLink = document.getElementById("register-link")

async function ensureTeacher() {
  const token = localStorage.getItem("token")
  if (!token) {
    window.location.assign("../forbidden.html")
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
  const app = document.getElementById("accounts-app")
  if (app) app.style.display = ""
  const nav = document.getElementById("accounts-nav")
  if (nav) nav.style.display = ""

  try {
    if (loginLink) loginLink.style.display = "none"
    if (registerLink) registerLink.style.display = "none"
    if (logoutButton) {
      logoutButton.style.display = "inline-block"
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token")
        window.location.assign("../forbidden.html")
      })
    }
  } catch (e) {
    console.error("Error updating nav links", e)
  }
}

async function fetchAccounts() {
  // Check if the user is a teacher (not a student). if they are not logged in or they are not a teacher, redirect to forbidden page. if they are a teacher, fetch the list of accounts from the backend and display them in a table.
  const token = localStorage.getItem("token")
  if (!token) {
    window.location.assign("../forbidden.html")
    return
  }

  try {
    const res = await fetch("https://api.alpha-project.duckdns.org/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error("unauthorized")

    const accounts = await res.json()
    displayAccounts(accounts)
  } catch (err) {
    console.error("Failed to fetch accounts", err)
    window.location.assign("../forbidden.html")
  }
}
// display account function should display the accounts in a table format, with columns for name, username, role, and date created
function displayAccounts(accounts) {
  const section = document.querySelector("#accounts-app section:nth-of-type(2)")
  if (!section) return
  const table = document.createElement("table")
  const thead = document.createElement("thead")
  const headerRow = document.createElement("tr")
  const headers = ["Name", "Username", "Role", "Date Created"]
  headers.forEach((headerText) => {
    const th = document.createElement("th")
    th.textContent = headerText
    headerRow.appendChild(th)
  })
  thead.appendChild(headerRow)
  table.appendChild(thead)
  const tbody = document.createElement("tbody")
  accounts.forEach((account) => {
    const row = document.createElement("tr")
    const nameCell = document.createElement("td")
    nameCell.textContent = account.name || "N/A"
    row.appendChild(nameCell)
    const usernameCell = document.createElement("td")
    usernameCell.textContent = account.username || "N/A"
    row.appendChild(usernameCell)
    const roleCell = document.createElement("td")
    roleCell.textContent = account.role || "N/A"
    row.appendChild(roleCell)
    const dateCell = document.createElement("td")
    const date = new Date(account.createdAt)
    dateCell.textContent = isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString()
    row.appendChild(dateCell)
    tbody.appendChild(row)
  })
  table.appendChild(tbody)

  // Use the existing section as the horizontal scroll container (no classes).
  section.style.overflowX = "auto"
  section.style.webkitOverflowScrolling = "touch"
  // ensure the flex container doesn't center/clip the table — allow it to stretch
  section.style.alignItems = "stretch"
  section.style.width = "100%"
  section.style.boxSizing = "border-box"
  section.appendChild(table)
}

;(async () => {
  await fetchAccounts()
})()
