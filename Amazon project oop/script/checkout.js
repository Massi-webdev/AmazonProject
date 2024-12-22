import {renderOrderSummary} from "./checkout/orderSummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { updateCheckoutHeader } from "./checkout/checkoutHeader.js";


renderOrderSummary();
renderPaymentSummary();
updateCheckoutHeader();

import "../data/products.js"