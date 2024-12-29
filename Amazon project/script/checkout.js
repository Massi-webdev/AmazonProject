import {renderOrderSummary} from "./checkout/orderSummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { updateCheckoutHeader } from "./checkout/checkoutHeader.js";
import {loadProductFetch, loadProduct} from "../data/products.js"
import { cart, loadCart, loadCartFetch } from "../data/cart.js";

updateCheckoutHeader();

//********************************************* simple solution *********************************************
// We can execute the same function multples time using different function as a parameter
//loadProduct(renderOrderSummary);
//loadProduct(renderPaymentSummary);



// ********************************************* CALL BACK Solution *********************************************
//we can also run ANNONYMOUS function using arrow function, instead of parameters to run multiple functions
/*
loadProduct(() => { 
    renderOrderSummary();
    renderPaymentSummary();
});
*/



//********************************************* PROMISES *********************************************
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

}).then((value)=>{   // We can share value between 2 steps of the promise and avoid nesting limitations
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


*/ //********************************************* PROMISE.ALL *********************************************
// PROMISE.ALL is an array of promises that we will for the promises to finish before goign to the next step
/* 
Promise.all([

  //------------------------- This promise was done using XMLHttpRequest
  new Promise((resolve)=> {      
    loadProduct(() => {
      resolve('value1');  
    });
  })
  */
/*
  // This promise was done using fetch() + promise --
  loadProductFetch()
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
*/
  

/*
// Why Do we use promises if it's additional work compared to Callbacks ??

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




/*//********************************************* ASYNC AWAIT *********************************************
// Example:
async function loadPage(){       //async nake a function like a promise
  console.log('Page loaded');
  return 'Passing value'         //-----passing value
};

loadPage().then((value)=>{       //call function and add then for next code to run
  console.log('next page');
  console.log(value);            //-----value was passed
});
*/


// Why use Async then? --> because there an Await feature --> let us wait for the promise to
//                                                            finish before the next line
// Example:
/*
async function loadPage2(){      //async nake a function like a promise


  try {
    
    //throw 'error1';             // we can push an manual error, to skip the following code And catch the error later

    await loadProductFetch()      // await let us run asynchronous code like normal code
                                  // No need to write a lot of code (then...)
                                  // It will execute this promise and move to the next line      
    await new Promise((resolve, reject)=>{
      //throw 'error2';           //if we await it's gonna go to the last catch
      loadCartFetch(()=>{
        //we can't use throw right here because throw is not a function  --> but reject() can
        //reject('error3');
        resolve('value2');
        });
    });

    const anotherPassedValue = await new Promise((resolve)=>{      // We can pass a value without using then
    resolve('another passed value');                               // decalre a variable + use resolve to pass it to the var

    });
    console.log(anotherPassedValue);

  } catch(error) {
    console.log('Unexpected error, please try again later!')
  }

  renderOrderSummary();
  renderPaymentSummary();      

  return 'Passing value'         //-----passing value
};

loadPage2().then((value)=>{      //call function and add then for next code to run
  console.log(value);            //-----value was passed
  console.log(cart)
});
*/


///////////////////////////////////////////// Exercices 18i /////////////////////////////////////////////////////////
async function loadPage3(){
  try{
    await Promise.all([
      loadProductFetch()
      ,
      new Promise((resolve, reject)=>{
        loadProductFetch();
        resolve('Success')
      })
    ]).then((message)=>{
      console.log(message)
    })
  }
  catch(error){
    console.log('Unexpected error, please try another time')
  }

  renderOrderSummary();
  renderPaymentSummary();    
}

loadPage3();