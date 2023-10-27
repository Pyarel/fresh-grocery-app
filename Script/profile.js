// Form controls
const form = document.getElementById("edit-profile-form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

//Get the data from localStorage
username.textContent = localStorage.getItem("Username");
// email.textContent = localStorage.getItem("Email");
// password.textContent = localStorage.getItem("password");

//Handle the form submit event
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
  }

  if (!validateEmail(email.value)) {
    alert("Invalid email address!");
  }

  if (!validatePassword(password.value)) {
    alert(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
    );
  }

  alert("Data saved");
  location.href = "index.html";
});

/**
 * Validate the email
 * @param email
 * @returns true if the email is valid, else returns false
 */

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate the password
 * @param password
 * @returns true if the password is valid, else returns false
 */
function validatePassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}
