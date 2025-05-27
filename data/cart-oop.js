function Cart(key) {
  const cart = {
    cartItems: undefined,

    loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(key));

    if (!this.cartItems) {
      this.cartItems = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '3'
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '1'
      },
      {
        productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 1,
        deliveryOptionId: '2'
      }]
    }
    },

    saveToStorage() {
      localStorage.setItem(key, JSON.stringify(this.cartItems));
    },

    addToCart(productId, quantity) {
      let matchingItem;
      matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
      if(matchingItem) matchingItem.quantity += quantity;
      else{
        this.cartItems.push({
          productId,
          quantity: 1,
          deliveryOptionId: '1'
        })
      }

      this.saveToStorage();
    },

    removeFromCart (productId){
      const productToDelete = productId;
      const index = this.cartItems.findIndex( cartItem => cartItem.productId === productToDelete);
      
      this.cartItems.splice(index,1);
      this.saveToStorage();
    },

    calculateCartQuantity() {
      let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
          cartQuantity += cartItem.quantity;
        })
      return cartQuantity;
    },

    renderCartQuanity(cartClass) {
      const cartQuantity = document.querySelector(`.${cartClass}`).innerHTML = this.calculateCartQuantity();
      return cartQuantity;
    },

    updateQuantity(productId, newQuantity) {
      let matchingItem;
      matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
      if(matchingItem) matchingItem.quantity = newQuantity;

      this.saveToStorage();
      return matchingItem.quantity;
    },

    updateDeliveryOption(productId, deliveryOptionId){
      let matchingItem;
      matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    }
  };


  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('business-cart-oop');

cart.loadFromStorage();
businessCart.loadFromStorage();

cart.addToCart("dd82ca78-a18b-4e2a-9250-31e67412f98d", 1);
console.log(cart);
console.log(businessCart);