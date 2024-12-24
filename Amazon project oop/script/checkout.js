import {renderOrderSummary} from "./checkout/orderSummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { updateCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProduct, products, loadProductFetch} from "../data/products.js";

updateCheckoutHeader();

// Solution 1 ----------------------------XMLHttpRequest + callbacks -----------------------------------

/*
//////////////// USE IMPORTED GET REQUEST PRODUCTS 
//loadProduct(renderOrderSummary);
//loadProduct(renderPaymentSummary);


/////////////////// XMLHttpRequest + callbacks 
loadProduct(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})
*/

// Solution 2 -------------------------------PROMISES---------------------------------------------------

/*

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
//------------------------------
*/


/*
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
*/


// Solution 3 -------------------------- FETCH() + PROMISES-------------------------------------------

//loadProductFetch(renderOrderSummary);
//loadProductFetch(renderPaymentSummary);
/*
loadProductFetch().then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})
*/



// SOLUTION 4 -------------------------- Fetch() + Promise.all() --------------------------------------
Promise.all([
  loadProductFetch()           //---- Fetch() function
  ,
  new Promise((resolve)=>{     // the rest of promise.all
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