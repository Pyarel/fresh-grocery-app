//initialising a variable name data
var itemCount = 0;

sessionStorage.setItem("Product count", itemCount);

//creation of increment function
function increment(event) {
  const incEvent = event.target;
  var currentElement = parseInt(incEvent.nextElementSibling.innerText);
  console.log(currentElement);
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
  const addToCartBtns = document.querySelectorAll(".add-to-cart");
  const btn = event.target;
  const btnParent = btn.parentElement;
  const product = btnParent.parentElement;
  const title = product.querySelector(".item-name").innerText;
  const price = product.querySelector(".item-price > b").innerText;
  const image = product.querySelector(".item-image img").getAttribute("src");
  const quantity = product.querySelector(
    ".count-container #counting"
  ).innerText;
  itemCount++;

  sessionStorage.setItem("Product count", itemCount);
  document.getElementById("item-count").innerText = itemCount;

  // productCart(title, price, image, quantity);
}

//Slide show for banner begins
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
// Slide show for banner ends

// Instock and outstock begins here
document.addEventListener("DOMContentLoaded", function () {
  const inStockRadio = document.querySelector('input[id="in-stock"]');
  const outOfStockRadio = document.querySelector('input[id="out-of-stock"]');
  const items = document.querySelectorAll(".item");

  inStockRadio.addEventListener("click", filterItems);
  outOfStockRadio.addEventListener("click", filterItems);

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
