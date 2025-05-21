import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { getDeliveryOption } from "../../data/delivery-options.js";

function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach( cartItem => {
    const product =  getProduct(cartItem.productId, products);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const matchingOption = getDeliveryOption(deliveryOptionId);
    
    productPriceCents += product.priceCents * cartItem.quantity;
    shippingPriceCents += matchingOption.priceCents;
  });

  const totalBeforeTax = (productPriceCents + shippingPriceCents)/100;
  const estimatedTax = (totalBeforeTax/10);
  const orderTotal = totalBeforeTax + estimatedTax;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money">$${productPriceCents / 100}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${shippingPriceCents / 100}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${totalBeforeTax}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${estimatedTax.toFixed(2)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${orderTotal.toFixed(2)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;
  
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}

export {renderPaymentSummary}