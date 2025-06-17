import { getOrder } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import { loadProductsFetch } from "../data/products.js";
import { calculateArrivingDay } from "./utils/date.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

async function renderTrackingPage() {
  await loadProductsFetch();
  const params = new URLSearchParams(window.location.search);

  const orderId = params.get('orderId');
  const productId = params.get('productId');
  const matchingOrder = getOrder(orderId);
  let productInfo = matchingOrder.products.find((product) => product.productId === productId);
  const deliveryDate = dayjs(calculateArrivingDay(productInfo));
  const dateString = deliveryDate.format('dddd, MMM DD');

  const matchingProduct = getProduct(productId);
  let orderInfoHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${dateString}
    </div>

    <div class="product-info">
      ${matchingProduct.name}
    </div>

    <div class="product-info">
      Quantity: ${productInfo.quantity}
    </div>

    <img class="product-image" src="${matchingProduct.image}">

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = orderInfoHTML;
}

renderTrackingPage();