///////////////////// generate products HTML ///////////////////////////////////////////
import { cart } from "../data/cart-class.js";
//import { cart, updateCartQuntity, AddToCart, saveCartItem } from "../data/cart.js";
import { products, loadProduct } from "../data/products.js";
import formatCurrency from "./utils/money.js";

// Render Cart Items at the beginning ///////
document.querySelector(".js-cart-items-number").innerHTML=cart.updateCartQuntity();   //generate cart items HTML

loadProduct(loadProductsGrid);

export function loadProductsGrid(){

  let productsHTML = "";

  products.forEach((product, index) => {
    productsHTML+=`
                  <div class="product-container">
                      <div class="product-image-container">
                          <img src="${product.image}" alt="" class="product-image">
                      </div>

                      <div class="product-name-container">
                          ${product.name}
                      </div>

                      <div class="product-rating-container">
                          <img src="${product.getStarsUrl()}" alt="" class="product-rank-image">
                          <div class="production-rating-count">${product.rating.count}</div>
                      </div>

                      <div class="product-price-container">
                          $${product.getPrice()} 
                      </div>
                      
                      <div class="product-quntity-container"> 
                        <select class="js-quantity-selector js-quantity-selector-${index}">
                          <option selected="" value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </div>
                      
                      ${product.extraInfoHTML()}

                      <div class="js-added-to-cart js-added-to-cart-off-${index}">
                        <img src="images/icons/checkmark.png" alt="" class="added-icon">
                        Added
                      </div>

                      <button class="js-add-to-cart-button js-add-to-cart-button-${index}"  data-product-id="${product.id}">Add to Cart</button>
                </div>
    `
  })

  document.querySelector(".all-products-container").innerHTML=productsHTML;




  //////////////// Make ADD to CART interactive ////////////////////////////////////////////////////////////////

  document.querySelectorAll(".js-add-to-cart-button").
    forEach((AddToCartButton, index) => {
      AddToCartButton.addEventListener('click', ()=>{

        const selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${index} `).value);

        const productId = AddToCartButton.dataset.productId;  // --------------- store data in variable

        cart.AddToCart(productId, selectedQuantity);
    
        document.querySelector(".js-cart-items-number").innerHTML=cart.updateCartQuntity();

        AddedTimeOuts(index);
    });
  })


  const timeOuts = [] // -------------------------    list of objects of differents timeout regenrated
  ///////////////////////////////////////////// ADDED Timeouts //////////////////////////////////////////////////
  // ------------------------------------------------------------------- if indexedtimeout exist => clear
  function AddedTimeOuts(index){
    if (timeOuts[index]){
      clearTimeout(timeOuts[index].on);
      clearTimeout(timeOuts[index].off);
    }
  //  ------------------------------------------------------------------- 'added' to cart Message timeouts
    const addedToCartONTimeOut = setTimeout(() => {
      document.querySelector(`.js-added-to-cart-off-${index}`).classList.add(`js-added-to-cart-on`);
    }, 0);
    
    const addedToCartOFFTimeOut = setTimeout(() => {
      document.querySelector(`.js-added-to-cart-off-${index}`).classList.remove(`js-added-to-cart-on`);
    }, 2000);
    

    //  -----------------------------------------------------------------  list of objects of differents timeout regenrated
    timeOuts[index] = {                              
      on: addedToCartONTimeOut,
      off: addedToCartOFFTimeOut
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////