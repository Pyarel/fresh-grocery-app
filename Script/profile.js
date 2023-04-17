$(document).ready(function () {
  const form = document.getElementById("edit-profile-form");
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match!");
      event.preventDefault();
    }

    if (!validateEmail(email.value)) {
      alert("Invalid email address!");
      event.preventDefault();
    }

    if (!validatePassword(password.value)) {
      alert(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
      );
      event.preventDefault();
    }

    alert("Data saved");
    location.href = "index.html";

    // Perform additional input validation for other fields here...

    // If all input validation checks have passed, redirect to another page
  });

  username.value = localStorage.getItem("Username");
  email.value = localStorage.getItem("Email");
  password.value = localStorage.getItem("password");
});

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}
