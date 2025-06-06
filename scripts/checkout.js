import { renderCart } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/car.js'
// import '../data/backend-practice.js';


Promise.all([
  new Promise((resolve) => {
    console.log('Start promise');
    loadProducts(() => {
      resolve('value1');
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('value2');
    });
  })

]).then((value) =>{
  console.log(value);
  renderCart();
  renderPaymentSummary(); 
})

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



