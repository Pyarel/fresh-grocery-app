var itemCount = sessionStorage.getItem("Product count");
var data = 0;
if (itemCount == 0) {
}

//creation of increment function
function incrementCart(event) {
  data = data + 1;
  document.getElementById("counting").innerText = data;
}
//creation of decrement function
function decrementCart(event) {
  var currentCount = document.getElementById("counting").innerText;
  console.log(currentCount);
  data = data - 1;
  currentCount = data;
}

function productCart(title, price, image, quantity) {
  if (itemCount != 0) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    const cartItems = document.querySelector(".cart-items");
    const cartItemNames = cartItems.querySelectorAll(".cart-item-title");
    for (let i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText === title) {
        alert("This item is already added to the cart");
        return;
      }
    }
    const cartItemContents = `
          <div class="cart-item-title">${title}</div>
          <div class="cart-item-price">$${price}</div>
        `;
    cartItem.innerHTML = cartItemContents;
    cartItems.appendChild(cartItem);
  }
}
