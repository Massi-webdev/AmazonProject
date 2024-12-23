import {renderOrderSummary} from "./checkout/orderSummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { updateCheckoutHeader } from "./checkout/checkoutHeader.js";
import {loadProduct} from "../data/products.js"
import { loadCart } from "../data/cart.js";

updateCheckoutHeader();

/////////////////////////////////////////// simple solution ///////////////////////////////////////////////
// We can execute the same function multples time using different function as a parameter
//loadProduct(renderOrderSummary);
//loadProduct(renderPaymentSummary);



////////////////////////////////////////// CALL BACK Solution /////////////////////////////////////////////
//we can also run ANNONYMOUS function using arrow function, instead of parameters to run multiple functions
/*
loadProduct(() => { 
    renderOrderSummary();
    renderPaymentSummary();
});
*/



//////////////////////////////////////// PROMISES ///////////////////////////////////////////////////////
// it a built in class used to --------------------------------------------------------------------------
//   - Better way handle asynchronous code
//   - similar to done() function in jasmine.
//   - Waits for some code to finish before goign to the next stop


/* //----------------------------------------Promises one by one----------------------------------------
new Promise((resolve)=> {       //resolve - similiar to done()   -lets us control when to go to the next step
  loadProduct(() => {
    resolve('value1');  // ----- like calling done() ------- Resolve let us control when to go to the next
  });
  // this promise Class allows Java to do multiple things at the same time.
  // which means Promise will this code above at the same time other code could be run (2 threads of codes)


  // TO SOlVE callbacks nesting issue, we use another Promise + resolve
}).then((value)=>{   // We can share value between 2 steps of the promise
  console.log(value) // ---> 'value1'
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });


}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
// When we don't use promiseAll, we load our codes promise by promise (step by step)

*/ //----------------------------------------PROMISE.ALL----------------------------------------
// PROMISE.ALL is an array of promises that we will for the promises to finish before goign to the next step
Promise.all([
  new Promise((resolve)=> {      
    loadProduct(() => {
      resolve('value1');  
    });
  })
  ,
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve('value2');
    });
  })

]).then((value)=>{
  console.log(value)  // => ['value1', 'value2']
  renderOrderSummary();
  renderPaymentSummary();
})

  

/*
////////////////////// Why Do we use promises if it's additional work compared to Callbacks ??????????????
//--Because a lot of callback cause multiples nesting  (codes inside codess)
// Like this
loadProduct(() => { 
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
// PROMISES help us flatten our code
*/
