const isLoggedIn = localStorage.getItem("loggedIn");
// jQuery function that executes when DOM is loaded
$(document).ready(function () {
  //Set the cart items count
  const cartCount = document.getElementById("item-count");
  if (sessionStorage.getItem("Product count") != null) {
    cartCount.innerText = parseInt(sessionStorage.getItem("Product count"));
  }

  // Hide all child elements in the "isLogin" container
  if (isLoggedIn) {
    const linksContainer = document.getElementById("isLogin");
    const logout = document.getElementById("logout");

    linksContainer.querySelectorAll("*").forEach((element) => {
      element.style.display = "none";
    });

    // Create a paragraph element for the username
    const userColumn = document.createElement("p");
    userColumn.textContent = localStorage.getItem("Username");
    userColumn.style.textDecorationLine = "underline";

    // Add a click event listener to the username paragraph
    userColumn.addEventListener("click", function () {
      // redirect to "editprofile.html"
      window.location.href = "editprofile.html";
    });

    // Append the username paragraph to the "isLogin" container
    linksContainer.appendChild(userColumn);

    //Display the logout button
    logout.style.display = "block";
  } else {
    const headerLinks = document.getElementsByClassName("header-links");
    if (headerLinks.length > 0) headerLinks[0].style.alignItems = "flex-end";
  }
});

/**
 * Function Logout
 * Clear the browser storage and redirect the user to login page
 */
function logout() {
  sessionStorage.clear();
  localStorage.clear();
  location.href = "login.html";
}
