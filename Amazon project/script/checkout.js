import { cart, saveCartItem, removeFromCart, updateCartQuntity } from "../data/cart.js";
import { products } from "../data/products.js";
import formatCurrency from "./utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import { deliveryOptions} from "../data/deliveryOptions.js"



/////////////////////////// Compare each cart Item with products /////////////////////////////////////////////////////////



updateCheckoutTotalItem();
renderCartItems();
countOrderTotal();


function renderCartItems(){
  let cartItemsHTML = '';
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
  
      <div class="delivery-date delivery-date-${matchingProduct.id}"> Delivery Date: <span class="js-delivery-date">${dayjs().add(1, 'days').format('dddd, MMMM DD')}</span> </div>
  
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
  
        <div class="all-delivery-options">
        
            <div class="delivery-options-title">Choose a delivery option:</div>
            
            <div class="js-delivery-options-container">
              ${deliveryOptionHTML(matchingProduct)}
            </div>
  
        </div>
        
      </div>

    </div>
    `
    document.querySelector('.js-cart-summary').innerHTML= cartItemsHTML;
    
  });
  
}
//------------------------------------------------------------------------------------------------------------------



///////////////////////////////////////////////////////// DELIVERY DATES CODE //////////////////////////////////////////////

// 1. loop throught delivery OPTIONS and generate delivery date html ------------------------------------------------------
function deliveryOptionHTML(matchingProduct){

  let html = '';
  deliveryOptions.forEach((deliveryOption, index)=>{

    ///--------------------Get Delivery Dates using an external libraray 
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM DD');
    
    const priceString = deliveryOption.priceCents=== 0 ? 'Free' :  `$ ${formatCurrency(deliveryOption.priceCents)} -`;
  
    /// ----------------- generate html from delivery options
    html += 
      `
        <div class="js-delivery-option">
          <input type="radio" name="delivery-option-${matchingProduct.id}" class="input-delivery-option js-input-delivery-option" data-input-id="${index+1}">
          <div>
            <div class="delivery-option-date"> ${dateString}</div>
            <div class="delivery-option-cost"> ${priceString} Shipping</div>
          </div>
        </div>
      `
  })
  return html;
}
//-----------------------------------------------------------------------------------------------------------------------------

// 2. Update delivery  automatically  + update date when clicking on date  with event listeners -------------------------------

document.querySelectorAll(".js-input-delivery-option").forEach(input =>{
  
  input.addEventListener('click', ()=>{

    const inputId = input.dataset.inputId;
    let selectedDeliveryDate;

    deliveryOptions.forEach(option =>{
      if (option.id===inputId){
        selectedDeliveryDate = dayjs().add((option.deliveryDays), 'days').format('dddd, MMMM DD');
      }
    })
    
    document.querySelector(".js-delivery-date").innerHTML=selectedDeliveryDate;
    
  })
})
//----------------------------------------------------------------------------------------------------------------------------









  
////////////////////////// Make Delete Links interactives //////////////////////////////////////////////////////////////////
//// Method1 --------------------------- delete from cart + delete html element

document.querySelectorAll('.delete-item').forEach((deleteLink, index) => {
  deleteLink.addEventListener('click',()=>{
    
    //cart.splice(index,1);                          //------------- method 2
    saveCartItem();
    const cartItemID = deleteLink.dataset.cartItemId;

    removeFromCart(cartItemID);

    saveCartItem();
    
    updateCheckoutTotalItem();

    const container = document.querySelector(`.js-cart-item-${cartItemID}`);

    container.remove();
    
    console.log(cart)
  })
})
//---------------------------------------------------------------------------------------------------------------------------






//////////////////////////////////// Make Update Links Interactive //////////////////////////////////////////////////////////
document.querySelectorAll(".update-item").forEach((updateLink)=>{
  updateLink.addEventListener('click', ()=>{

    const productID = updateLink.dataset.cartItemId;

    document.querySelector(`.item-quantity-${productID}`).innerHTML=
    `
        <span> Quantiy: <input class="update-input js-unpdate-input-${productID}" type="number" min="1" value="1"> </span> 
        <span class="js-save-item-${productID} save-item" data-cart-item-id="${productID}">Save</span>
        <span class="js-delete-item-${productID} delete-item" data-cart-item-id="${productID}">Delete</span>
    `

//----------------------------------------------------------------------------- Make Save Link Interactive 
    document.querySelector(`.js-save-item-${productID}`).addEventListener('click', ()=>{
        const updateInputElement = document.querySelector(`.js-unpdate-input-${productID}`);
        cart.forEach(cartItem =>{
          if (cartItem.productId===productID){
            cartItem.quantity = Number(updateInputElement.value);
            saveCartItem();
            updateCheckoutTotalItem();
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
//--------------------------------------------------------------------------------------------------------------------------





/////////////////////////////////////// Update checkout Header link ////////////////////////////////////////////////////////
function updateCheckoutTotalItem(){
  document.querySelector('.js-checkout-link').innerHTML = `${updateCartQuntity()} Items`;
  document.querySelector('.js-order-summary-total-items').innerHTML = `Items (${updateCartQuntity()}):`;
}
//--------------------------------------------------------------------------------------------------------------------------




/////////////////////////////////////// Count order Total //////////////////////////////////////////////////////////////////
function countOrderTotal(shippingPrice){

  let orderTotal = 0;

  cart.forEach(cartItem=>{

    const cartItemId = cartItem.productId;

    products.forEach(product =>{
      if(cartItemId===product.id){
        orderTotal+=product.priceCents;
      }
    });
  });
  
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
            <div class="payment-summary-money"> $0.00 </div>
          </div>
    
          <div class="payment-summary-row subtotal-row js-subtotal-row">
            <div class="total-before-tax">Total before tax:</div>
            <div class="payment-summary-money payment-summary-money-tbt"> $${formatCurrency(orderTotal)} </div>
          </div>
    
          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money"> $${formatCurrency(orderTotal*0.1)} </div>
          </div>
    
          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money"> $${formatCurrency(orderTotal*1.1)} </div>
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