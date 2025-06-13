let cart;
loadFromStorage();
function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "3",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "1",
      },
      {
        productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId, quantity) {
  let matchingItem;
  matchingItem = cart.find((cartItem) => cartItem.productId === productId);
  if (matchingItem) matchingItem.quantity += quantity;
  else {
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }

  saveToStorage();
}

function removeFromCart(productId) {
  const productToDelete = productId;
  const index = cart.findIndex(
    (cartItem) => cartItem.productId === productToDelete
  );

  cart.splice(index, 1);
  saveToStorage();
}

function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

function renderCartQuanity(cartClass) {
  const cartQuantity = (document.querySelector(`.${cartClass}`).innerHTML =
    calculateCartQuantity());
  return cartQuantity;
}

function updateQuantity(productId, newQuantity) {
  let matchingItem;
  matchingItem = cart.find((cartItem) => cartItem.productId === productId);
  if (matchingItem) matchingItem.quantity = newQuantity;

  saveToStorage();
  return matchingItem.quantity;
}

function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  matchingItem = cart.find((cartItem) => cartItem.productId === productId);

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    fun();
  });

  xhr.addEventListener("error", (error) => {
    console.log("Unexpected error. Please try again later.", error);
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}

/*
async function loadCartAsync(fun) {
  const promise = await new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      resolve(xhr.response);
      fun();
    });
  
    xhr.addEventListener("error", (error) => {
      console.log("Unexpected error. Please try again later.", error);
    });
  
    xhr.open("GET", "https://supersimplebackend.dev/cart");
    xhr.send();
  })

  const text = await promise;
  console.log(text);
}
*/

export async function loadCartFetch() {
  const promise = await fetch("https://supersimplebackend.dev/cart")
  const response = await promise.text();
  console.log(response);
  return response;
}

export {
  cart,
  loadFromStorage,
  addToCart,
  removeFromCart,
  calculateCartQuantity,
  renderCartQuanity,
  updateQuantity,
  updateDeliveryOption,
};
