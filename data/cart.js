const cart = [];

function addToCart(productId, quantity) {
  let matchingItem;
  matchingItem = cart.find(cartItem => cartItem.productId === productId);
  if(matchingItem) matchingItem.quantity += quantity;
  else{
    cart.push({
      productId,
      quantity
    })
  }
}

export { cart, addToCart };