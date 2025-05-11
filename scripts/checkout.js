import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

renderCart();
function renderCart() {
  let cartSummaryHTML = '';
  
  cart.forEach( (cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    matchingProduct = products.find( product => product.id === productId);
    
    cartSummaryHTML +=`
    <div class="cart-item-container js-cart-${matchingProduct.id}-container">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>
  
      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">
        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-${matchingProduct.id}-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary"
            data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-${matchingProduct.id}-quantity-input"
            value="${cartItem.quantity}"
            data-product-id="${matchingProduct.id}">
            <span class="save-quantiy-link link-primary"
            data-product-id="${matchingProduct.id}">
              Save
            </span>
            <span class="delete-quantity-link link-primary"
            data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>
  
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  });

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  addUpdateEvent();
  updateCheckout();
  addDeleteEvent();
}

function addDeleteEvent() {
  document.querySelectorAll('.delete-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset;
      
      removeFromCart(productId);
      renderCart();
    })
  });
}

function updateCheckout() {
  document.querySelector('.js-return-to-home-link').innerHTML = `${calculateCartQuantity()} items`;
}

function addUpdateEvent(){
  document.querySelectorAll('.update-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const {productId} = link.dataset;
      
        document.querySelector(`.js-cart-${productId}-container`)
          .classList.add('is-editing-quantity')
        });
      });
  
  addSaveEvent();
  handleKeyDown();
}

function addSaveEvent() {
  document.querySelectorAll('.save-quantiy-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const {productId} = link.dataset;
  
        saveNewQuantity(productId);
      })
    })
}

function saveNewQuantity(productId) {
  let inputQuantity = Number(document.querySelector(`.js-${productId}-quantity-input`).value);

  if(inputQuantity < 0 || inputQuantity > 1000 || !inputQuantity) alert('Not a valid quantity');

  else{
    document.querySelector(`.js-quantity-${productId}-label`).innerHTML = updateQuantity(productId, inputQuantity);
  
    document.querySelector(`.js-cart-${productId}-container`)
      .classList.remove('is-editing-quantity')
  
    updateCheckout();
  }
}

function handleKeyDown() {
  document.querySelectorAll('.quantity-input')
    .forEach((input) => {
      input.addEventListener('keydown', event => {
        const {productId} = input.dataset;
        if(event.key === 'Enter') saveNewQuantity(productId);
      });
   });
}




