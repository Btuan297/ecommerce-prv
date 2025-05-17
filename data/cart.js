let cart;
loadFromStorage();
function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionsId: '3'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionsId: '1'
    },
    {
      productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      quantity: 1,
      deliveryOptionsId: '2'
    }]
  }
};

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, quantity) {
  let matchingItem;
  matchingItem = cart.find(cartItem => cartItem.productId === productId);
  if(matchingItem) matchingItem.quantity += quantity;
  else{
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionsId: '1'
    })
  }

  saveToStorage();
}

function removeFromCart (productId){
  const productToDelete = productId;
  const index = cart.findIndex( cartItem => cartItem.productId === productToDelete);
  
  cart.splice(index,1);
  saveToStorage();
}

function calculateCartQuantity() {
  let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    })
  return cartQuantity;
}

function renderCartQuanity(cartClass) {
  const cartQuantity = document.querySelector(`.${cartClass}`).innerHTML = calculateCartQuantity();
  return cartQuantity;
}

function updateQuantity(productId, newQuantity) {
  let matchingItem;
  matchingItem = cart.find(cartItem => cartItem.productId === productId);
  if(matchingItem) matchingItem.quantity = newQuantity;

  saveToStorage();
  return matchingItem.quantity;
}

export { cart, addToCart, removeFromCart, calculateCartQuantity, renderCartQuanity, updateQuantity };