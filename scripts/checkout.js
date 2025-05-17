import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { deliveryOptions } from "../data/delivery-options.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

renderCart();
function renderCart() {
  let cartSummaryHTML = '';
  
  cart.forEach( (cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    matchingProduct = products.find( product => product.id === productId);

    const deliveryOptionId = cartItem.deliveryOptionsId;
    let matchingOption;
    matchingOption = deliveryOptions.find( option => option.id === deliveryOptionId);
    
    cartSummaryHTML +=`
    <div class="cart-item-container js-cart-${matchingProduct.id}-container">
      <div class="delivery-date">
        Delivery date: ${calculateDate(matchingOption)}
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
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
    `;
  });

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  //thêm lại các event vào các thẻ khi thực hiện thao tác thêm, sửa, xóa
  addUpdateEvent();
  updateCheckout();
  addDeleteEvent();
}

function calculateDate(option){
  const today = dayjs();
  const deliveryDate =  today.add(option.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMM DD');

  return dateString;
}

function deliveryOptionsHTML(matchingProduct, cartItem){
  let optionsHTML = '';
  deliveryOptions.forEach( option => {
    const priceString = option.priceCents === 0 
    ? 'FREE' 
    : `$${formatCurrency(option.priceCents)}`;

    const isChecked = option.id === cartItem.deliveryOptionId;

    optionsHTML += `
      <div class="delivery-option">
        <input type="radio" ${isChecked ? 'checked': ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${calculateDate(option)}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>
    `
  })

  return optionsHTML;
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
        const {productId} = link.dataset;// lấy dữ liệu từ data attribute
  
        saveNewQuantity(productId);
      })
    })
}

function saveNewQuantity(productId) {

  //lấy dữ liệu từ ô input tương ứng với productId được lấy từ data attribute
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



