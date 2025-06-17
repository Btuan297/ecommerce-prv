import { cart, calculateCartQuantity, saveToStorage } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/delivery-options.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";
import { renderCart } from "./orderSummary.js";

function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
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
      <div class="payment-summary-money">$${formatCurrency(
        productPriceCents
      )}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(
        shippingPriceCents
      )}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(
        totalBeforeTax
      )}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  if(cart.length === 0) {
    document.querySelector('.js-order-summary')
      .innerHTML = `
        <div> Your cart is empty </div>
        <a class="button-primary view-products-link" href="index.html"> View products </a>
      `;
    document.querySelector('.js-place-order').classList.add('place-order-button-disabled');
  }

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });

        const order = await response.json();
        addOrder(order);
        clearCart();
      } catch (error) {
        console.log("Unexpected error. Try again later.", error);
      }

      window.location.href = "orders.html";
    });
}

function clearCart() {
  cart.length = 0;
  saveToStorage();
  renderCart();
  renderPaymentSummary();
}

export { renderPaymentSummary };
