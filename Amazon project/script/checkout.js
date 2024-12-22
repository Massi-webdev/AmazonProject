import {renderOrderSummary} from "./checkout/orderSummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { updateCheckoutHeader } from "./checkout/checkoutHeader.js";
import {loadProduct} from "../data/products.js"

// We can execute the same function multples time using different function as a parameter
loadProduct(renderOrderSummary);
loadProduct(renderPaymentSummary);

//we can also run ANNONYMOUS function using arrow function, instead of 1 parameter to run multiple functions
loadProduct(() => { 
  renderOrderSummary();
  renderPaymentSummary();
});
//This technique is a CALL BACK FUNCTION : function that runs in the future

updateCheckoutHeader();

