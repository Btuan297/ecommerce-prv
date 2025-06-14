import { renderCart } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch, loadCart } from "../data/cart.js";

async function loadPage() {
  try {
    await Promise.all([loadProductsFetch(), loadCartFetch()]);
  } catch (error) {
    console.log("Unexpected error. Please try again later.", error);
  }

  renderCart();
  renderPaymentSummary();
}

loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve(1);
    });
  })

]).then((value) =>{
  console.log(value);
  renderCart();
  renderPaymentSummary(); 
})
*/

/*
new Promise((resolve) => {
  console.log('Start promise');
  loadProducts(() => {
    resolve('value1');
  });
}).then((value) => {
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
}).then(() => {
  renderCart();
  renderPaymentSummary(); 
});
*/
/*
loadProducts(() => {
  loadCart(() => {
    renderCart();
    renderPaymentSummary();    
  })
})
*/
