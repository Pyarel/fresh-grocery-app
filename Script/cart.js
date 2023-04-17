$(document).ready(function () {
  if (sessionStorage.getItem("Product count") != null) {
    document.getElementById("item-count").innerText = parseInt(
      sessionStorage.getItem("Product count")
    );
  }

  if (sessionStorage.getItem("products") != null) {
    const productInCart = JSON.parse(sessionStorage.getItem("products"));
    var totalPrice = 0,
      totalWithTax = 0;
    if (productInCart?.length > 0) {
      //   console.log(productInCart.length);
      // Get the container element for the cart items
      const cartItemsContainer = document.querySelector(".cart-items");

      // An array of product information
      const products = productInCart; // Add more products here as needed];

      // Loop through the products array and create a cart-row for each one
      for (let i = 0; i < products.length; i++) {
        let priceInt =
          parseFloat(products[i].productPrice.replace("$", "")) *
          parseInt(products[i].productQuantity);
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
        <strong>${priceInt}</strong>
      </div>
    `;

        // Append the cart-row to the container element
        cartItemsContainer.appendChild(cartRow);
      }

      // Add the remaining HTML content after the cart-rows are created
      const remainingHTML = `
        <div class="btn_actions">
        <a class="dt-sc-btn" href="grocery.html">Continue shopping</a>
        </div>
    </div>
    
  `;
      const orderHTML = `<div class="shipping-section">
            <h2>Order Summary</h2>
            <h4>Before tax: <span id="total-before-tax">${totalPrice}</span></h4>
            <h4>HST: 13%</h4>
            <h4>Subtotal:$ <span id="total-with-tax">${totalWithTax}</span></h4>
            <p>Shipping, taxes, and discounts will be calculated at checkout.</p>
            <button class="checkout" onclick="placeOrder()">Place Order</button>
            </div>`;

      cartItemsContainer.insertAdjacentHTML("beforeend", remainingHTML);
      cartItemsContainer.insertAdjacentHTML("afterend", orderHTML);
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

function placeOrder() {
  alert("Thank you for shopping with Fresh!.\nYour order has been placed.");
  sessionStorage.clear();
  location.reload;
}

//creation of increment function
function incrementCart(event) {
  let plusBtnParent = event.target;
  let itemQty = parseInt(plusBtnParent.previousElementSibling.innerHTML) + 1;
  let items = event.target.parentElement.parentElement.parentElement;
  var itemPrice = parseFloat(
    items.querySelector("b").innerText.replace("$", "")
  );
  var totalPrice = itemPrice * itemQty;
  plusBtnParent.previousElementSibling.innerHTML = itemQty;
  var totalPriceBtn = items.getElementsByTagName("strong");
  totalPriceBtn[0].innerText = totalPrice;
  var subtotal = parseFloat(
    document.getElementById("total-before-tax").innerText
  );

  var taxTotal = subtotal + itemPrice;
  document.getElementById("total-before-tax").innerText = taxTotal;
  document.getElementById("total-with-tax").innerText =
    0.13 * taxTotal + taxTotal;
}
//creation of decrement function
function decrementCart(event) {
  var totalPrice = 0;
  let decBtnParent = event.target;
  let currentQty = parseInt(decBtnParent.nextElementSibling.innerHTML);
  let items = event.target.parentElement.parentElement.parentElement;
  var itemPrice = parseFloat(
    items.querySelector("b").innerText.replace("$", "")
  );
  //   console.log(currentQty);
  let itemQty = currentQty;
  if (currentQty != 1) {
    itemQty = currentQty - 1;
    decBtnParent.nextElementSibling.innerHTML = itemQty;
    totalPrice = itemQty * itemPrice;
    var totalPriceBtn = items.getElementsByTagName("strong");
    totalPriceBtn[0].innerText = totalPrice;
    var subtotal = parseFloat(
      document.getElementById("total-before-tax").innerText
    );

    var taxTotal = subtotal - itemPrice;
    document.getElementById("total-before-tax").innerText = taxTotal;
    document.getElementById("total-with-tax").innerText =
      0.13 * taxTotal + taxTotal;
  }
}
function deleteProduct(event) {
  var deleteProduct =
    event.target.parentElement.parentElement.parentElement.firstChild
      .nextElementSibling.innerText;
  var products = JSON.parse(sessionStorage.getItem("products"));
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
      location.reload();
    }
  }
}
