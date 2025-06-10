import { renderCart } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";
// import '../data/car.js'
// import '../data/backend-practice.js';


async function loadPage() {
  await loadProductsFetch();

  const value = await loadCartFetch();

  console.log(value);

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



