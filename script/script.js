const items = document.querySelectorAll(".products-item");
const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");
// Filter shop products
function applyFilter(filter) {
  items.forEach((item) => {
    const type = item.getAttribute("data-type");

    if (type === filter || filter === "all") {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}
// Show Cart Page
function showModalFunction() {
  backDrop.style.display = "flex";
  cartModal.style.opacity = "1";
  cartModal.style.top = "30%";
  // cartModal.style.display = "flex";
}
// Close Cart Page
function closeModalFunction() {
  backDrop.style.display = "none";
  cartModal.style.opacity = "0";
  cartModal.style.top = "10%";
  // cartModal.style.display = "none";
}

cartBtn.addEventListener("click", showModalFunction());
closeModal.addEventListener("click", closeModalFunction());
backDrop.addEventListener("click", closeModalFunction());

// Add item to cart
const addToCartButtons = document.getElementsByClassName("shop-item-button");
for (let i = 0; i < addToCartButtons.length; i++) {
  const button = addToCartButtons[i];
  button.addEventListener("click", addToCartClicked);
}
function addToCartClicked(event) {
  const button = event.target;
  const shopItem = button.parentElement;
  const title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  const price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-item");
  const cartItems = document.getElementsByClassName("cart")[0];
  const cartItemNames = document.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  const cartRowContents = `
          <div class="item-row">
            <img class="cart-item-img" src="${imageSrc}" />
            <div class="cart-item-desc">
              <p class="cart-item-title">${title}</p>
              <p class="cart-item-price">${price}</p>
            </div>
            <div class="cart-item-controller">
              <i class="fas fa-chevron-up" onclick="increaseQuantity()"></i>
              <p class="cart-quantity">1</p>
              <i class="fas fa-chevron-down" onclick="decreaseQuantity()"></i>
            </div>
            <button class="btn-remove">Remove</button>
          </div>
          `;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName("btn-remove")[0].addEventListener("click", removeCartItem());
  cartRow.getElementsByClassName("fa-chevron-up")[0].addEventListener("click", updateCartTotal());
  cartRow.getElementsByClassName("fa-chevron-down")[0].addEventListener("click", updateCartTotal());
}

// Cart Items Counter
function cartItemsCounter() {
  var counterItems = document.getElementsByClassName("cart-items-counter")[0];
  var cartItems = document.getElementsByClassName("cart-item");

  counterItems.innerText = cartItems.length;
}

// Remove product
function removeCartItem() {
  const removeCartItemButtons = document.getElementsByClassName("btn-remove");
  var counterItems = document.getElementsByClassName("cart-items-counter")[0];

  for (let i = 0; i < removeCartItemButtons.length; i++) {
    const button = removeCartItemButtons[i];
    button.addEventListener("click", function (event) {
      var buttonClicked = event.target;
      buttonClicked.parentElement.remove();
      updateCartTotal();
      counterItems.innerText = removeCartItemButtons.length;
    });
    counterItems.innerText = removeCartItemButtons.length;
  }
}

// Increase Value
function increaseQuantity() {
  var numberQuantity = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < numberQuantity.length; i++) {
    let numberQ = numberQuantity[i];
    let value = parseInt(numberQ.innerText);
    numberQ.innerText = value + 1;
    updateCartTotal();
  }
}

// Decrease Value
function decreaseQuantity() {
  var numberQuantity = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < numberQuantity.length; i++) {
    let numberQ = numberQuantity[i];
    let value = parseInt(numberQ.innerText);
    numberQ.innerText = value - 1;
    // Prevent negative amount
    if (numberQ.innerText <= 0) {
      numberQ.innerText = 1;
    }
    updateCartTotal();
  }
}

// Cart Total
function updateCartTotal() {
  var cartRows = document.getElementsByClassName("cart-item");
  var total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.querySelectorAll(".cart-item-price")[0];
    var quantityElement = cartRow.querySelectorAll(".cart-quantity")[0];
    var itemPrice = parseFloat(priceElement.innerText.replace("€", ""));
    var quantity = parseFloat(quantityElement.innerText);
    var total = total + itemPrice * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total")[0].innerText = "Total price: " + total + " €";
}

// Confirm purchase button
function confirmPurchase() {
  alert("Thank you for your purchase!");
  const cartItems = document.getElementsByClassName("cart-item")[0];
  const itemRow = document.getElementsByClassName("item-row");

  console.log(itemRow.parentNode);
  // console.log(cartItems.parentElement.childNodes === "cart-item");
  // console.log(cartItems.parentElement.childNodes.length);

  closeModalFunction();
  updateCartTotal();
  cartItemsCounter();
}
