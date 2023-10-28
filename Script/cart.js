document.addEventListener("DOMContentLoaded", function () {
  const itemCountElement = document.getElementById("item-count");
  const cartItemsContainer = document.querySelector(".cart-items");

  // if products is not null
  if (sessionStorage.getItem("products") !== null) {
    const products = JSON.parse(sessionStorage.getItem("products"));

    let totalPrice = 0;
    let totalWithTax = 0;

    if (products.length > 0) {
      //for every product construct the cart row
      products.forEach((product) => {
        const { productTitle, productImage, productPrice, productQuantity } =
          product;
        //calculate the product price based of quantity
        const price =
          parseFloat(productPrice.replace("$", "")) * parseInt(productQuantity);
        //Add it to the total price (cart total)
        totalPrice += price;

        const cartRow = document.createElement("div");
        cartRow.classList.add("cart-row");
        cartRow.innerHTML = `
          <div class="cart-product">
            <img src="${productImage}" alt="${productTitle}">
          </div>
          <div class="product-info">
            <h2>${productTitle}</h2>
            <div class="item-price"><b>${productPrice}</b></div>
            <div class="qty-box-set">
              <button type="button" class="qtyminus1" onclick="updateQuantity(event, -1)"> - </button>
              <h2 class="quantity-selector" id="counting">${productQuantity}</h2>
              <button type="button" class="qtyplus1" onclick="updateQuantity(event, 1)"> + </button>
              <button type="button" class="cart__remove close_icon" onclick="deleteProduct(event,'${productTitle}')">
                <i class="fa-regular fa-trash-can fa-xl"></i>
              </button>
            </div>
          </div>
          <div class="price">
            <span class="cart_total">Total : $</span>
            <strong>${price}</strong>
          </div>
        `;

        cartItemsContainer.appendChild(cartRow);
      });
      //Calulate the cart total with tax
      totalWithTax = 0.13 * totalPrice + totalPrice;
      itemCountElement.innerText = products.length; // Update the product count in navbar, cart logo

      const remainingHTML = `
        <div class="btn_actions">
          <a class="dt-sc-btn" href="grocery.html">Continue shopping</a>
        </div>
      `;

      const orderHTML = `
        <div class="shipping-section">
          <h2>Order Summary</h2>
          <h4>Before tax: <span id="total-before-tax">${totalPrice}</span></h4>
          <h4>HST: 13%</h4>
          <h4>Subtotal:$ <span id="total-with-tax">${totalWithTax}</span></h4>
          <p>Shipping, taxes, and discounts will be calculated at checkout.</p>
          <button class="checkout" onclick="placeOrder()">Place Order</button>
        </div>
      `;

      cartItemsContainer.insertAdjacentHTML("beforeend", remainingHTML);
      cartItemsContainer.insertAdjacentHTML("afterend", orderHTML);
    } else emptyCart();
  } else emptyCart();
});

//display the empty cart page
function emptyCart() {
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <img src="../Images/cart.webp">
        <h1 style="text-align:center;">Your Cart is Empty</h1>
        <a href="produce.html" class="dt-sc-btn" style="display:block; margin-left:12em;width:35%;text-align:center;"> Start Shopping</a>
      </div>
    `;
}
//update the product quantity in cart page
function updateQuantity(event, change) {
  const quantityElement =
    event.target.parentElement.querySelector(".quantity-selector");
  let newQuantity = parseInt(quantityElement.innerText) + change;
  if (newQuantity < 1) return;
  quantityElement.innerText = newQuantity;
}

//Delete the product
function deleteProduct(event, title) {
  const products = JSON.parse(sessionStorage.getItem("products"));
  const updatedProducts = products.filter(
    (product) => product.productTitle !== title
  );
  sessionStorage.setItem("products", JSON.stringify(updatedProducts));
  sessionStorage.setItem("Product count", updatedProducts.length);
  document.getElementById("item-count").innerText = updatedProducts.length;

  location.reload();
}

//Place the order
function placeOrder() {
  alert("Thank you for shopping with Fresh!.\nYour order has been placed.");
  sessionStorage.clear();
  location.reload();
}
