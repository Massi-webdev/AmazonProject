import { cart, updateCartQuntity } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency} from "../utils/money.js"

/////////////////////////////////////// Count order Total //////////////////////////////////////////////////////////////////
export function countOrderTotal(){

    let orderTotal = 0;
    let ShippingPriceTotal = 0;
  
    cart.forEach(cartItem=>{
  
      const cartItemId = cartItem.productId;
  
      ShippingPriceTotal+=cartItem.shippingPrice;
      
      products.forEach(product =>{
        if(cartItemId===product.id){
          orderTotal+=product.priceCents * cartItem.quantity;
        }
      });
    });
  
    const totalBeforeTax = orderTotal + ShippingPriceTotal;
    const tax = totalBeforeTax * 0.1
    const totalAfterTax = totalBeforeTax + tax;
  
    document.querySelector('.js-payment-summary').innerHTML=
    `
      <div class="js-payment-info">
            <div class="payment-summary-title"> Order Summary </div>
      
            <div class="payment-summary-row">
              <div class="js-order-summary-total-items">Items (${updateCartQuntity()}):</div>
              <div class="payment-summary-money"> $${formatCurrency(orderTotal)} </div>
            </div>
      
            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money"> $${formatCurrency(ShippingPriceTotal)} </div>
            </div>
      
            <div class="payment-summary-row subtotal-row js-subtotal-row">
              <div class="total-before-tax">Total before tax:</div>
              <div class="payment-summary-money payment-summary-money-tbt"> $${formatCurrency(totalBeforeTax)} </div>
            </div>
      
            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money"> $${formatCurrency(tax)} </div>
            </div>
      
            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money"> $${formatCurrency(totalAfterTax)} </div>
            </div>
      </div>
  
      <div class="paypal-toggle">
            Use PayPal <input type="checkbox" class="js-paypal-toggle" false="">
      </div>
  
      <div class="js-payment-buttons-container false">
  
            <div class="js-paypal-button-container paypal-button-container"></div>
    
            <button class="js-place-order-button place-order-button button-primary" d="">
              Place your order
            </button>
      </div>
  
    `
  }
  //-------------------------------------------------------------------------------------------------------------------------------