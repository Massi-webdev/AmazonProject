import {renderOrderSummary} from "./checkout/orderSummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { updateCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProduct, products } from "../data/products.js";

updateCheckoutHeader();


//******************************************* PROMISES ***********************************************
new Promise((resolve)=>{
  loadProduct(()=>{
    resolve('value 1');
  });

}).then((value1)=>{
  return new Promise((resolve)=>{
    let test = () => {
      console.log('another promise')
    };
    console.log(value1)
    resolve('value 2');
  });

}).then((value2)=>{
  renderOrderSummary();
  renderPaymentSummary();
  console.log(value2)
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