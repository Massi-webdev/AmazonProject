import {renderOrderSummary} from "./checkout/orderSummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { updateCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProduct, products } from "../data/products.js";

updateCheckoutHeader();

/*
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
    test();
    console.log(value1)
    resolve('value 2');
  });

}).then((value2)=>{
  renderOrderSummary();
  renderPaymentSummary();
  console.log(value2)
});
//----------------------------------------------------------------------------------------------------
*/



//***************************************** PROMISES.ALL *********************************************
//let us run multiples promises at the same time + wait for all then to finish to go to THEN
Promise.all([
  new Promise((resolve)=>{
    loadProduct(()=>{
      resolve('value3');
    });
  })
  ,
  new Promise((resolve)=>{
    let test = () => {
      console.log('another promise')
    };
    test();
    resolve('value 4');
  })
]).then((values)=>{
  renderOrderSummary();
  renderPaymentSummary();
  console.log(values); // --> it's a list of passed values
})
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