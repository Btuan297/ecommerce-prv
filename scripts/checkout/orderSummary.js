import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption } from "../../data/delivery-options.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

function renderCart() {
  let cartSummaryHTML = '';
  
  cart.forEach( (cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId, products);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const matchingOption = getDeliveryOption(deliveryOptionId);
    
    cartSummaryHTML +=`
    <div class="cart-item-container js-cart-${matchingProduct.id}-container">
      <div class="delivery-date js-delivery-date-${matchingProduct.id}">
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
            <input type="number" class="quantity-input js-${matchingProduct.id}-quantity-input"
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
  saveUpdatedOption();
  addUpdateEvent();
  updateCheckout();
  addDeleteEvent();
}

// Làm việc với delivery option
function calculateDate(option){
  const today = dayjs();
  const deliveryDate =  today.add(option.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMM DD');

  return dateString;
}

function saveUpdatedOption(){
  document.querySelectorAll('.js-delivery-option')
    .forEach( option => {
      option.addEventListener('click', () => {
        const {productId, deliveryOptionId} = option.dataset;

        updateDeliveryOption(productId, deliveryOptionId);
        renderCart();
        renderPaymentSummary();
      })
    })
}

function deliveryOptionsHTML(matchingProduct, cartItem){
  let optionsHTML = '';
  deliveryOptions.forEach( option => {
    const priceString = option.priceCents === 0 
    ? 'FREE' 
    : `$${formatCurrency(option.priceCents)}`;

    const isChecked = option.id === cartItem.deliveryOptionId;

    optionsHTML += `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${option.id}">
        <input type="radio" ${isChecked ? 'checked': ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date js-delivery-option-date-${option.id}">
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

// thêm các sự kiện
function addDeleteEvent() {
  document.querySelectorAll('.delete-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset;
      
      removeFromCart(productId);
      renderCart();
      renderPaymentSummary();
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
  //thêm sự kiện vào nút Save
  document.querySelectorAll('.save-quantiy-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const {productId} = link.dataset;// lấy dữ liệu từ data attribute
  
        saveNewQuantity(productId);
      })
    })
}

function saveNewQuantity(productId) {
  //update số lượng sản phẩm và render lại checkout
  //lấy dữ liệu từ ô input tương ứng với productId được lấy từ data attribute
  let inputQuantity = Number(document.querySelector(`.js-${productId}-quantity-input`).value);

  if(inputQuantity < 0 || inputQuantity > 1000 || !inputQuantity) alert('Not a valid quantity');

  else{
    document.querySelector(`.js-quantity-${productId}-label`).innerHTML = updateQuantity(productId, inputQuantity);
  
    document.querySelector(`.js-cart-${productId}-container`)
      .classList.remove('is-editing-quantity')
  
    updateCheckout();
    renderPaymentSummary();
  }
}

function handleKeyDown() {
  //thực hiện save khi bấm enter sau khi nhập dữ liệu vào ô input
  document.querySelectorAll('.quantity-input')
    .forEach((input) => {
      input.addEventListener('keydown', event => {
        const {productId} = input.dataset;
        if(event.key === 'Enter') {
          saveNewQuantity(productId);
        }
      });
   });
}

export {renderCart}