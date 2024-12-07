import { cart, saveCartItem, removeFromCart, updateCartQuntity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartItemsHTML = '';

/////////////////////////// Compare each cart Item with products /////////////////////////
updateCheckoutHeaderLink();
renderCartItems();

function renderCartItems(){
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
    <div class="js-cart-item js-cart-item-${matchingProduct.id}">
  
      <div class="delivery-date"> Delivery Date: <span class="js-delivery-date">Tuesday, December 10</span> </div>
  
      <div class="Cart-item-details-grid">
        <img src="${matchingProduct.image}" class="cart-item-image" alt="">
  
        <div class="cart-item-details">
          <div class="item-name">${matchingProduct.name}</div>
          <div class="item-price">$${formatCurrency(matchingProduct.priceCents)}</div>
          <div class="item-quantity item-quantity-${matchingProduct.id}" data-cart-item-id="${matchingProduct.id}">
            <span>Quantiy: ${itemOnCart.quantity} </span> 
            <span class="js-update-item-${matchingProduct.id} update-item" data-cart-item-id="${matchingProduct.id}">Update</span>
            <span class="js-delete-item-${matchingProduct.id} delete-item" data-cart-item-id="${matchingProduct.id}">Delete</span>
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
}



  
////////////////////////// Make Delete Links interactives //////////////////////////////
//// Method1 --------------------------- delete from cart + delete html element

document.querySelectorAll('.delete-item').forEach((deleteLink, index) => {
  deleteLink.addEventListener('click',()=>{
    
    //cart.splice(index,1);                          //------------- method 2
    saveCartItem();
    const cartItemID = deleteLink.dataset.cartItemId;

    removeFromCart(cartItemID);

    saveCartItem();
    
    updateCheckoutHeaderLink();

    const container = document.querySelector(`.js-cart-item-${cartItemID}`);

    container.remove();
    
    console.log(cart)
  })
})



//////////////////////////////////// Make Update Links Interactive ////////////////////////////////////////////
document.querySelectorAll(".update-item").forEach((updateLink)=>{
  updateLink.addEventListener('click', ()=>{

    const productID = updateLink.dataset.cartItemId;

    document.querySelector(`.item-quantity-${productID}`).innerHTML=
    `
        <span> Quantiy: <input class="update-input js-unpdate-input-${productID}" type="number" min="1" value="1"> </span> 
        <span class="js-save-item-${productID} save-item" data-cart-item-id="${productID}">Save</span>
        <span class="js-delete-item-${productID} delete-item" data-cart-item-id="${productID}">Delete</span>
    `

//////----------------------------------------------------------------------------- Make Save Link Interactive 
    document.querySelector(`.js-save-item-${productID}`).addEventListener('click', ()=>{
        const updateInputElement = document.querySelector(`.js-unpdate-input-${productID}`);
        cart.forEach(cartItem =>{
          if (cartItem.productId===productID){
            cartItem.quantity = Number(updateInputElement.value);
            saveCartItem();
            updateCheckoutHeaderLink();
          };
        });
        console.log(cart);
        document.querySelector(`.item-quantity-${productID}`).innerHTML= 
        `
          <span> Quantiy: ${updateInputElement.value} </span> 
          <span class="js-update-item-${productID} update-item" data-cart-item-id="${productID}">Update</span>
          <span class="js-delete-item-${productID} delete-item" data-cart-item-id="${productID}">Delete</span>
        `
      });
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/*
`
<div class="item-quantity item-quantity-${matchingProduct.id}" data-cart-item-id="${matchingProduct.id}">
  <span> Quantiy: ${itemOnCart.quantity} </span> 
  <span class="js-update-item-${matchingProduct.id} update-item" data-cart-item-id="${matchingProduct.id}">Update</span>
  <span class="js-delete-item-${matchingProduct.id} delete-item" data-cart-item-id="${matchingProduct.id}">Delete</span>
</div>
`
*/




/////////////////////////////////////// Update checkout Header link ////////////////////////////////////////
function updateCheckoutHeaderLink(){
  document.querySelector('.js-checkout-link').innerHTML = updateCartQuntity();
}
