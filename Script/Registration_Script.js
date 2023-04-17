// JavaScript source code
function validateForm() {
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm-password").value;
  var usernameError = document.getElementById("username-error");
  var emailError = document.getElementById("email-error");
  var passwordError = document.getElementById("password-error");
  var confirmPasswordError = document.getElementById("confirm-password-error");

  localStorage.setItem("Username", username);
  localStorage.setItem("Email", email);
  localStorage.setItem("Password", password);

  var valid = true;

  // Validate username
  if (username == "") {
    usernameError.innerHTML = "Please enter a username.";
    valid = false;
  } else {
    usernameError.innerHTML = "";
  }

  if (email == "") {
    emailError.innerHTML = "Please enter an email.";
    valid = false;
  } else if (!validateEmail(email)) {
    emailError.innerHTML = "Please enter a proper email id";
    valid = false;
  } else {
    emailError.innerHTML = "";
  }

  if (password == "") {
    passwordError.innerHTML = "Please enter password.";
    valid = false;
  } else if (!validatePassword(password)) {
    passwordError.innerHTML =
      "Password requires a special character, capital letter, number and small letter.";
    valid = false;
  } else {
    passwordError.innerHTML = "";
  }

  if (confirmPassword == "") {
    confirmPasswordError.innerHTML = "Please confirm password.";
    valid = false;
  } else {
    confirmPasswordError.innerHTML = "";
  }

  if (confirmPassword != password) {
    confirmPasswordError.innerHTML =
      "Your Password does not match.Please re-enter.";
    valid = false;
  } else {
    confirmPasswordError.innerHTML = "";
  }

  if(valid==true){
    alert("You have successfully registered!!!");
  }
  return valid;
}

//email regex validation
function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//password regex validation
function validatePassword(password) {
  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// from login page to registration page when clicking on register button
function redirectToRegistration(){
  window.location.href="Registration.html";
}

document.getElementById("Registration-btn").addEventList("click", redirectToRegistration);
