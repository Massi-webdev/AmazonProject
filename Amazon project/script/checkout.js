import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartItemsHTML = '';

/////////////////////////// Compare each cart Item with products /////////////////////////
cart.forEach((itemOnCart, index) => {   

  let matchingProduct; //if cart item = product => matching Item

  //----------------------Compare products with cart item to find the matching item
  products.forEach((product)=>{ 
    if(product.id===itemOnCart.productId){
      matchingProduct=product
    }
  })


  cartItemsHTML+=
  `
  <div class="js-cart-item">

    <div class="delivery-date"> Delivery Date: <span class="js-delivery-date">Tuesday, December 10</span> </div>

    <div class="Cart-item-details-grid">
      <img src="${matchingProduct.image}" class="cart-item-image" alt="">

      <div class="cart-item-details">
        <div class="item-name">${matchingProduct.name}</div>
        <div class="item-price">$${formatCurrency(matchingProduct.priceCents)}</div>
        <div class="item-quantity">
          <span>Quantiy: ${itemOnCart.quantity} </span> 
          <span>Update</span>
          <span>Delete</span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">Choose a delivery option:</div>

        <div class="js-delivery-option">
          <input type="radio" name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date"> Tuesday, December 10 </div>
            <div class="delivery-option-cost"> Free Shipping</div>
          </div>
        </div>

        <div class="js-delivery-option">
          <input type="radio" name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date"> Tuesday, December 10 </div>
            <div class="delivery-option-cost"> Free Shipping</div>
          </div>
        </div>

        <div class="js-delivery-option">
          <input type="radio" name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date"> Tuesday, December 10 </div>
            <div class="delivery-option-cost"> Free Shipping</div>
          </div>
        </div>

      </div>
      <div></div>
    </div>
  </div>
  `
  document.querySelector('.js-cart-summary').innerHTML= cartItemsHTML
});


  
