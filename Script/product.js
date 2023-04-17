function filterPrice() {
  let numResults = 0;
  var priceStartInput = document.getElementById("price-start").value;
  var priceEndInput = document.getElementById("price-end").value;

  var priceStart = parseFloat(priceStartInput.replace("$ ", ""));
  var priceEnd = parseFloat(priceEndInput.replace("$ ", ""));

  var itemPrice = 0;
  var items = document.getElementsByClassName("item");
  for (var i = 0; i < items.length; i++) {
    var item = items[i];

    var itemPriceString =
      item.getElementsByClassName("item-price")[0].innerText;

    const match1 = itemPriceString.match(/\d+\.\d+/); // matches any sequence of digits and a decimal point
    if (match1) {
      itemPrice = parseFloat(match1[0]);
    } else {
      const match2 = itemPriceString.match(/\d+/); // matches any sequence of digits
      if (match2) {
        itemPrice = parseInt(match2[0]);
      }
    }

    if (itemPrice < priceStart || itemPrice > priceEnd) {
      item.style.display = "none";
    } else {
      item.style.display = "block";
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
document.addEventListener("DOMContentLoaded", function () {
  const inStockRadio = document.querySelector('input[id="in-stock"]');
  const outOfStockRadio = document.querySelector('input[id="out-of-stock"]');

  inStockRadio.addEventListener("change", filterItems);
  outOfStockRadio.addEventListener("change", filterItems);
  const inStock = document.getElementById("in-stock");
  const outOfStock = document.getElementById("out-of-stock");
  radioButtons = [inStock, outOfStock];
  for (const radioButton of radioButtons) {
    radioButton.addEventListener("change", () => {
      for (const radioButton of radioButtons) {
        radioButton.classList.toggle("checked", radioButton.checked);
      }
    });
  }
});
function filterItems() {
  const items = document.querySelectorAll(".item");
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
