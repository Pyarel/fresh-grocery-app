$(document).ready(function () {
  if (sessionStorage.getItem("Product count") != null) {
    document.getElementById("item-count").innerText = parseInt(
      sessionStorage.getItem("Product count")
    );
  }
  if (JSON.parse(sessionStorage.getItem("products")).length != 0) {
    const productInCart = JSON.parse(sessionStorage.getItem("products"));
    var totalPrice = 0,
      totalWithTax = 0;
    if (productInCart.length > 0) {
      //   console.log(productInCart.length);
      // Get the container element for the cart items
      const cartItemsContainer = document.querySelector(".cart-items");

      // An array of product information
      const products = productInCart; // Add more products here as needed];

      // Loop through the products array and create a cart-row for each one
      for (let i = 0; i < products.length; i++) {
        let priceInt = parseInt(products[i].productPrice.replace("$", ""));
        totalPrice = totalPrice + priceInt;
        // console.log(products[i].productPrice);
        totalWithTax = 0.13 * totalPrice + totalPrice;
        // Create a new cart-row element
        const cartRow = document.createElement("div");
        cartRow.classList.add("cart-row");

        // Set the HTML content for the cart-row
        cartRow.innerHTML = `
      <div class="cart-product" >
        <img src="${products[i].productImage}" alt="${products[i].productTitle}">
      </div>
      <div class="product-info" id = "product-info">
        <h2>${products[i].productTitle}</h2>
        <div class="item-price"><b>${products[i].productPrice}</b></div>
        <div class="qty-box-set">
          <button type="button" class="qtyminus1" onclick="decrementCart(event)"> - </button>
          <h2 class="quantity-selector" id="counting">${products[i].productQuantity}</h2>
          <button type = "button" class="qtyplus1" onclick="incrementCart(event)"> + </button>
          <button onclick = "deleteProduct(event)" type = "button" class="cart__remove close_icon">
            <i class="fa-regular fa-trash-can fa-xl"></i>
          </button>
        </div>
      </div>
      <div class="price">
        <span class="cart_total">Total : $</span>
        <strong>${totalPrice}</strong>
      </div>
    `;

        // Append the cart-row to the container element
        cartItemsContainer.appendChild(cartRow);
      }

      // Add the remaining HTML content after the cart-rows are created
      const remainingHTML = `
        <div class="btn_actions">
        <a class="dt-sc-btn" href="/collections/all">Continue shopping</a>
        <input type="submit" name="update" class="dt-sc-btn " value="Update Cart">
        </div>
    </div>
    
  `;
      const orderHTML = `<div class="shipping-section">
            <h2>Order Summary</h2>
            <h4>Subtotal:$ ${totalWithTax}</h4>
            <p>Shipping, taxes, and discounts will be calculated at checkout.</p>
            <button class="checkout">Place Order</button>
            </div>`;

      cartItemsContainer.insertAdjacentHTML("beforeend", remainingHTML);
      cartItemsContainer.insertAdjacentHTML("afterend", orderHTML);
    }
  } else {
    const cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.innerHTML = `
    <div class="empty-cart">
    <img src="../Images/cart.webp">
    <h1 style = "text-align:center;">Your Cart is Empty</h1>
    <a href = "produce.html" class="dt-sc-btn" style="display:block; margin-left:12em;width:35%;text-align:center;"> Start Shopping</a>
    </div>
    `;
  }
});

//creation of increment function
function incrementCart(event) {
  let plusBtnParent = event.target;
  let itemQty = parseInt(plusBtnParent.previousElementSibling.innerHTML) + 1;
  plusBtnParent.previousElementSibling.innerHTML = itemQty;
}
//creation of decrement function
function decrementCart(event) {
  let decBtnParent = event.target;
  let currentQty = parseInt(decBtnParent.nextElementSibling.innerHTML);
  //   console.log(currentQty);
  let itemQty = currentQty;
  if (currentQty != 1) {
    itemQty = currentQty - 1;
    decBtnParent.nextElementSibling.innerHTML = itemQty;
  }
}
function deleteProduct(event) {
  var deleteProduct =
    event.target.parentElement.parentElement.parentElement.firstChild
      .nextElementSibling.innerText;
  var products = JSON.parse(sessionStorage.getItem("products"));
  console.log(products);
  for (var i = 0; i < products.length; i++) {
    if (deleteProduct == products[i].productTitle) {
      products.splice(i, 1);
      sessionStorage.setItem("products", JSON.stringify(products));
      let count = parseInt(sessionStorage.getItem("Product count"));
      console.log(count);
      count = count - 1;
      console.log(count);
      sessionStorage.setItem("Product count", count);
      document.getElementById("item-count").innerText = count;
      location.href = "cart.html";
    }
  }
}
