import {renderOrderSummary} from "./checkout/orderSummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { updateCheckoutHeader } from "./checkout/checkoutHeader.js";
import '../data/cart-class.js';   //Runs all the code without importing anything.


renderOrderSummary();
renderPaymentSummary();
updateCheckoutHeader();