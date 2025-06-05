import { products, addSizeChart, loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { addToCart, calculateCartQuantity, renderCartQuanity } from '../data/cart.js';

loadProducts(renderProductGrid);
renderCartQuanity('js-cart-quantity');
let setTimeoutId = {};

function showAddedMessage (productId) {
  document.querySelector(`.js-added-message-${productId}`).classList.add('added-message');
  
  if(setTimeoutId[productId]){
    clearTimeout(setTimeoutId[productId]);
  }
  setTimeoutId[productId] = setTimeout(()=>{
    document.querySelector(`.js-added-message-${productId}`).classList.remove('added-message');
  }, 2000);
}

function renderProductGrid() {
  let productsHTML = '';
  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png"">
          <div class="product-rating-count link-primary">
            ${10}
          </div>
        </div>

        <div class="product-price">
          $${formatCurrency(product.priceCents)}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${addSizeChart(product)}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-message-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}"
        >
          Add to Cart
        </button>
      </div>
    `;
  });
  document.querySelector('.js-products-grid').innerHTML = productsHTML;
  addToCartEvent();
}

function addToCartEvent(){
  document.querySelectorAll('.js-add-to-cart').forEach( (button) => {
    button.addEventListener('click', () => {
      const {productId} = button.dataset;
      const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
      
      addToCart(productId, quantity);
      calculateCartQuantity();
      renderCartQuanity('js-cart-quantity');
      showAddedMessage(productId);
    })
  });
}

