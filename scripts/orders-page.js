import { orders } from "../data/orders.js";
import { addToCart, renderCartQuanity } from "../data/cart.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

renderOrders();
async function renderOrders() {
  await loadProductsFetch();
  let ordersHeader = "";
  let ordersHTML = "";

  orders.forEach((order) => {
    const orderTime = dayjs(order.orderTime).format("MMM DD");
    ordersHeader = `
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderTime}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>
      
        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>
    `;
    let ordersDetails = "";
    order.products.forEach((product) => {
      const productId = product.productId;
      const matchingProduct = getProduct(productId);
      ordersDetails += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${calculateArrivingDay(product)}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button"
          data-product-id="${matchingProduct.id}"
          >
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=123&productId=456">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });
    ordersHTML += `
      <div class="order-container">
        ${ordersHeader}
        <div class="order-details-grid">
          ${ordersDetails}
        </div>
      </div>
    `;
  });
  if (orders.length === 0) ordersHTML = "You haven't purchased anything yet!";
  document.querySelector(".js-order-grid").innerHTML = ordersHTML;
  renderCartQuanity("cart-quantity");
  buyAgain();
}

function buyAgain() {
  document.querySelectorAll(".js-buy-again-button")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const { productId } = button.dataset;
        addToCart(productId, 1);
        renderCartQuanity("cart-quantity");
    });
  });
}

function calculateArrivingDay(product) {
  let arrivingDate = dayjs(product.estimatedDeliveryTime);
  const checkDate = arrivingDate.format("dddd");
  if (checkDate === "Saturday") arrivingDate = arrivingDate.add(2, "days");
  if (checkDate === "Sunday") arrivingDate = arrivingDate.add(1, "days");
  const dateString = arrivingDate.format("MMM DD");
  return dateString;
}
