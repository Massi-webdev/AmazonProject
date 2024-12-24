import {renderOrderSummary} from "./checkout/orderSummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { updateCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProduct, products } from "../data/products.js";

updateCheckoutHeader();


//******************************************* PROMISES ***********************************************
new Promise((resolve)=>{
  loadProduct(()=>{
    resolve();
  })
}).then(()=>{
  return new Promise((resolve)=>{
    let test = () => {
      console.log('another promise')
    };
    resolve();
  });
}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
//----------------------------------------------------------------------------------------------------


/*
//////////////// USE IMPORTED GET REQUEST PRODUCTS //////////////////////////////////////
//loadProduct(renderOrderSummary);
//loadProduct(renderPaymentSummary);


/////////////////// XMLHttpRequest + callbacks /////////////////////////////////////////
loadProduct(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})
*/