function filterPrice() {
  let numResults = 0;

  const priceStart = Number(document.getElementById("price-start").value);
  const priceEnd = Number(document.getElementById("price-end").value);

  let itemPrice = 0;
  const items = document.getElementsByClassName("item");

  Array.from(items).forEach((item) => {
    let itemPriceString = item.querySelector(".item-price").textContent;
    const itemPrice = parseFloat(itemPriceString.match(/(\d+)(?:\.(\d+))?/)); // matches any sequence of digits and a decimal point

    if (itemPrice < priceStart || itemPrice > priceEnd) {
      item.style.display = "none";
    } else {
      item.style.display = "block";
      numResults++;
    }
  });
  // Display message if no items are found
  const noResultsMsg = document.getElementById("no-results-msg");
  noResultsMsg.style.display = numResults === 0 ? "flex" : "none";
}

function filterItems() {
  const items = document.querySelectorAll(".item");
  // get the checked radio button
  const selectedRadio = document.querySelector(
    'input[name="stock-filter"]:checked'
  );

  Array.from(items).forEach((item) => {
    console.log(item);
    if (selectedRadio.value == "out-of-stock") {
      if (item.querySelector(".item-Outstock")) item.style.display = "block";
      else item.style.display = "none";
    } else {
      if (item.querySelector(".item-Instock")) item.style.display = "block";
      else item.style.display = "none";
    }
  });
}

//Search the products in product list
function searchProducts() {
  let numResults = 0;
  const query = searchInput.value.toLowerCase(); // Get the search query
  const items = document.querySelectorAll(".item");

  Array.from(items).forEach(function (item) {
    const itemName = item.textContent.toLowerCase();
    // Hide products that don't match the search query,  Show products that do match the search query
    if (itemName.includes(query)) {
      // If the item name includes the search query, display the product
      item.style.display = "block";
      numResults++;
    } else {
      // If the item name does not include the search query, hide the product
      item.style.display = "none";
    }
  });

  // Display message if no items are found
  const noResultsMsg = document.getElementById("no-results-msg");
  noResultsMsg.style.display = numResults === 0 ? "flex" : "none";
}

//creation of increment function
function increment(event) {
  const productCountElement = event.target.nextElementSibling;
  const currentCount = parseInt(productCountElement.innerText, 10);
  productCountElement.innerText = currentCount + 1;
}
//creation of decrement function
function decrement(event) {
  const productCountElement = event.target.previousElementSibling;
  let currentCount = parseInt(productCountElement.innerText, 10);

  if (currentCount > 0) {
    productCountElement.innerText = currentCount - 1;
  }
}

function addToCart(event) {
  let itemCount = 0;
  const product = event.target.closest(".item");
  const title = product.querySelector(".item-name").textContent;
  const price = product.querySelector(".item-price").textContent;
  const image = product.querySelector(".item-image img").getAttribute("src");
  const quantity = parseInt(product.querySelector(".counting").textContent);
  if (quantity <= 0) {
    alert("Please select quantity");
  } else {
    if (sessionStorage.getItem("Product count") != null) {
      itemCount = parseInt(sessionStorage.getItem("Product count"));
    }
    itemCount++;
    sessionStorage.setItem("Product count", itemCount);
    document.getElementById("item-count").innerText = itemCount;
    productCart(title, price, image, quantity);
  }
}

function productCart(title, price, image, quantity) {
  let items = [];
  if (sessionStorage.getItem("products") != null) {
    items = JSON.parse(sessionStorage.getItem("products"));
    items.push({
      productTitle: title,
      productPrice: price,
      productImage: image,
      productQuantity: quantity,
    });
  } else {
    items.push({
      productTitle: title,
      productPrice: price,
      productImage: image,
      productQuantity: quantity,
    });
  }
  sessionStorage.setItem("products", JSON.stringify(items));
}

//DOM content loaded
document.addEventListener("DOMContentLoaded", function () {
  const inStock = document.getElementById("in-stock");
  const outOfStock = document.getElementById("out-of-stock");

  const radioButtons = [inStock, outOfStock];
  for (const radioButton of radioButtons) {
    radioButton.addEventListener("change", () => {
      inStock.classList.toggle("checked", radioButton.checked);
      outStock.classList.toggle("checked", radioButton.checked);
    });
  }
  inStock.addEventListener("change", filterItems);
  outOfStock.addEventListener("change", filterItems);

  // When key is released inside search input, execute the callback function searchProducts
  const searchInput = document.getElementById("searchInput");
  searchInput?.addEventListener("keyup", searchProducts);
});
