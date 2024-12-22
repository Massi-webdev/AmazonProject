import { cart } from "../../data/cart-class.js";

export function updateCheckoutHeader(){
    document.querySelector('.js-checkout-link').innerHTML = `${cart.updateCartQuntity()} Items`;
  }