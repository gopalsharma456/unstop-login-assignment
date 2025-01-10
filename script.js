let userData = {};

document.getElementById("login-form").addEventListener("submit", handleLogin);

function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!validateInputs(username, email, password)) return;

  userData = { username, email, password };

  loginRequest();
}

function validateInputs(username, email, password) {
  if (username !== "emilys") {
    alert("Enter a valid username.");
    return false;
  }
  if (!email) {
    alert("Email is required.");
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Invalid email format.");
    return false;
  }
  if (!password) {
    alert("Password is required.");
    return false;
  }
  if (password.length < 8) {
    alert("Password must contain at least 8 characters.");
    return false;
  }
  return true;
}

function loginRequest() {
  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Login failed.");
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("auth-token", JSON.stringify(data));
      alert("Login successful!");
      window.location.href = "./home.html";
    })
    .catch((err) => {
      console.error(err);
      alert("An error occurred during login.");
    });
}

function checkAuth() {
  const auth = localStorage.getItem("auth-token");
  const currentPage = window.location.pathname;

  if (!auth && currentPage.endsWith("home.html")) {
    window.location.href = "./index.html";
  }

  if (auth && currentPage.endsWith("index.html")) {
    window.location.href = "./home.html";
  }
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("auth-token");
    window.location.href = "./index.html";
  }
}

checkAuth();
