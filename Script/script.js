//initialising a variable name data

var data = 0;
//creation of increment function
function increment() {
  data = data + 1;
  document.getElementById("counting").innerText = data;
}
//creation of decrement function
function decrement() {
  data = data - 1;
  document.getElementById("counting").innerText = data;
}
