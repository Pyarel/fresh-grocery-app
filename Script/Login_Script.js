// Script for Login Page
function validateForm() {
  // Get the form controls
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var usernameError = document.getElementById("username-error");
  var passwordError = document.getElementById("password-error");
  var valid = true;

  // Validate username
  if (username == "") {
    //Check if user name field is empty
    usernameError.innerHTML = "Please enter your username.";
    valid = false;
  } else if (username == "User") {
    //Check if user name is User and password is valid
    if (password == "") {
      passwordError.innerHTML = "Please enter your password.";
      valid = false;
    } else if (password == "user") {
      passwordError.innerHTML = "Logged in.";
      alert("Login Successful");
      // If login is successful, store the credentials in browser storage
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("Username", username);
      return valid;
    } else if (password != "user") {
      // In case of Invalid login, return false
      passwordError.innerHTML = "Wrong PassWord.";
      valid = false;
      return valid;
    } else {
      passwordError.innerHTML = "";
    }
  } else if (username != "User") {
    //If Username is not user, then display wrong user name
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
