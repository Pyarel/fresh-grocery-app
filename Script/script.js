document.addEventListener("DOMContentLoaded", function () {
  // Your JavaScript code goes here
  searchInput.addEventListener("keyup", searchProducts);
  const inStockRadio = document.querySelector('input[id="in-stock"]');
  const outOfStockRadio = document.querySelector('input[id="out-of-stock"]');
  const items = document.querySelectorAll(".item");

  inStockRadio.addEventListener("change", filterItems);
  outOfStockRadio.addEventListener("change", filterItems);

  function filterItems() {
    // get the checked radio button
    const selectedRadio = document.querySelector(
      'input[name="stock-filter"]:checked'
    );

    Array.from(items).forEach((item) => {
      if (selectedRadio.value == "out-of-stock") {
        if (item.querySelector(".item-Outstock")) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      } else {
        if (item.querySelector(".item-Instock")) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      }
    });
  }
});

function searchProducts() {
  let numResults = 0;
  const query = searchInput.value.toLowerCase();
  const productList = document.getElementById("products");
  const products = productList.getElementsByClassName("item");

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const productName = product.textContent.toLowerCase();

    if (productName.indexOf(query) === -1) {
      product.style.display = "none"; // Hide products that don't match the search query
    } else {
      product.style.display = ""; // Show products that do match the search query
      numResults++;
    }
  }
  // Display message if no items are found
  const noResultsMsg = document.getElementById("no-results-msg");
  if (numResults === 0) {
    noResultsMsg.style.display = "flex"; // Show the message
  } else {
    noResultsMsg.style.display = "none"; // Hide the message
  }
}

$(document).ready(function () {
  if (sessionStorage.getItem("Product count") != null) {
    document.getElementById("item-count").innerText = parseInt(
      sessionStorage.getItem("Product count")
    );
  }
  const searchInput = document.getElementById("searchInput");
});

//creation of increment function
function increment(event) {
  const incEvent = event.target;
  var currentElement = parseInt(incEvent.nextElementSibling.innerText);
  const productCount = currentElement + 1;
  incEvent.nextElementSibling.innerText = productCount;
}
//creation of decrement function
function decrement(event) {
  const decEvent = event.target;
  var productCount = 0;
  let currentElement = parseInt(decEvent.previousElementSibling.innerHTML);
  if (currentElement != 0) {
    productCount = currentElement - 1;
  }
  decEvent.previousElementSibling.innerHTML = productCount;
}

function addToCart(event) {
  let itemCount = 0;
  const addToCartBtns = document.querySelectorAll(".add-to-cart");
  const btn = event.target;
  const btnParent = btn.parentElement;
  const product = btnParent.parentElement;
  const title = product.querySelector(".item-name").innerText;
  const price = product.querySelector(".item-price").innerText;
  const image = product.querySelector(".item-image img").getAttribute("src");
  const quantity = product.querySelector(
    ".count-container #counting"
  ).innerText;
  let convertedQ = parseInt(quantity);
  if (convertedQ <= 0) {
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

// Slide show for banner begins
$(function () {
  var $slideshow = $("#slides");
  var $slides = $slideshow.find("img");
  var currentIndex = 0;

  var timer = null;
  var duration = 3000;

  function showSlide(index) {
    // Hide all slides
    $slides.hide();

    // Show the current slide
    $slides.eq(index).show();
  }

  function nextSlide() {
    currentIndex++;
    if (currentIndex >= $slides.length) {
      currentIndex = 0;
    }
    showSlide(currentIndex);
  }

  function startTimer() {
    timer = setInterval(nextSlide, duration);
  }

  startTimer();
});