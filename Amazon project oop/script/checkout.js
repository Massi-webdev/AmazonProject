import {renderOrderSummary} from "./checkout/orderSummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { updateCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProduct, products } from "../data/products.js";

updateCheckoutHeader();

//loadProduct(renderOrderSummary);
//loadProduct(renderPaymentSummary);

// or we can use callbacks

loadProduct(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})
