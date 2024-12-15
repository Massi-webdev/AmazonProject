import { updateCartQuntity } from "../../data/cart.js";

export function updateCheckoutHeader(){
    document.querySelector('.js-checkout-link').innerHTML = `${updateCartQuntity()} Items`;
  }