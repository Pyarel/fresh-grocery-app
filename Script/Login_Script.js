// Script for Login Page
function validateForm() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var usernameError = document.getElementById("username-error");
  var passwordError = document.getElementById("password-error");
  var valid = true;

  // Validate username
  if (username == "") {
    usernameError.innerHTML = "Please enter your username.";
    valid = false;
  } else if (username == "User") {
    if (password == "") {
      passwordError.innerHTML = "Please enter your password.";
      valid = false;
    } else if (password == "user") {
      passwordError.innerHTML = "Logged in.";
      alert("Login Successful");
      localStorage.setItem("isLogin", true);
      localStorage.setItem("Username", username);
      return valid;
    } else if (password != "user") {
      passwordError.innerHTML = "Wrong PassWord.";
      valid = false;
      return valid;
    } else {
      passwordError.innerHTML = "";
    }
  } else if (username != "User") {
    usernameError.innerHTML = "Wrong User Name.";
    valid = false;
  } else {
    usernameError.innerHTML = "";
  }

  // Validate password
  if (password == "") {
    passwordError.innerHTML = "Please enter your password.";
    valid = false;
  } else {
    passwordError.innerHTML = "";
  }

  return valid;
}
