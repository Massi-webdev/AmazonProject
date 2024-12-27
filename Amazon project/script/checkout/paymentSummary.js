import { cart, updateCartQuntity } from "../../data/cart.js";
import { loadProduct, getProduct, products} from "../../data/products.js";
import { formatCurrency} from "../utils/money.js"
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";
/////////////////////////////////////// Count order Total //////////////////////////////////////////////////////////////////

export function renderPaymentSummary(){

    let orderTotal = 0;
    let ShippingPriceTotal = 0;
        
    cart.forEach(cartItem=>{
      
      const productId = cartItem.productId;
      const deliveryOptionId = cartItem.deliveryOptionId;
      
      //---- get the cart product and all its price data.
      const matchingProduct = getProduct(productId);                 // get matchingProduct using imported function
      orderTotal += matchingProduct.priceCents * cartItem.quantity;  //count matching product and it's order quantity
  
      
      //----calc shipping prices
      const deliveryPrice = getDeliveryOption(deliveryOptionId);     
      ShippingPriceTotal += deliveryPrice.priceCents;                //count all items' shipping prices
      
    });
  
    const totalBeforeTax = orderTotal + ShippingPriceTotal;
    const tax = totalBeforeTax * 0.1;
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
    
            <button class="js-place-order place-order-button button-primary" d="">
              Place your order
            </button>
      </div>
  
    `

    document.querySelector(".js-place-order").addEventListener('click', async()=>{
      

        try {
          const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cart:cart
            })
          })

            const order = await response.json();
            console.log(response)
            addOrder(order);
        } 
        
        catch(error) {
          console.log('Unexpected error. Try again later');
        }
        window.location.href = 'orders.html'
    })
}



  //-------------------------------------------------------------------------------------------------------------------------------