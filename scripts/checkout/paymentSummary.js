import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct, products, loadProducts } from "../../data/products.js";
import { getDeliveryOption } from "../../data/delivery-options.js";
import { formatCurrency } from "../utils/money.js";


loadProducts();
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

  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const estimatedTax = totalBeforeTax * 0.1;
  const orderTotal = totalBeforeTax + estimatedTax;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;
  
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}

export {renderPaymentSummary}