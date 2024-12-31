///////////////////// generate products HTML ///////////////////////////////////////////
import { cart, updateCartQuntity, AddToCart, saveCartItem } from "../data/cart.js";
import { products, loadProductFetch } from "../data/products.js";
import formatCurrency from "./utils/money.js";

// Render Cart Items at the beginning ///////
document.querySelector(".js-cart-items-number").innerHTML=updateCartQuntity();   //generate cart items HTML

loadProductFetch().then(()=>{
renderProductsGrid(products);
})


function renderProductsGrid(products){

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

        AddToCart(productId, selectedQuantity);
    
        document.querySelector(".js-cart-items-number").innerHTML=updateCartQuntity();

        AddedTimeOuts(index);
        const url = new URL(window.location.href);
        console.log(url.searchParams.get('search'))
    });
  })


  const timeOuts = [] // -------------------------    list of objects of differents timeout regenrated
  ///////////////////////////////////////////// ADDED Timeouts //////////////////////////////////////////////////
        // ------------------------------------------------------------ if indexedtimeout exist => clear
        function AddedTimeOuts(index){
          if (timeOuts[index]){
            clearTimeout(timeOuts[index].on);
            clearTimeout(timeOuts[index].off);
          }
        //  ----------------------------------------------------------- 'added' to cart Message timeouts
          const addedToCartONTimeOut = setTimeout(() => {
            document.querySelector(`.js-added-to-cart-off-${index}`).classList.add(`js-added-to-cart-on`);
          }, 0);
          
          const addedToCartOFFTimeOut = setTimeout(() => {
            document.querySelector(`.js-added-to-cart-off-${index}`).classList.remove(`js-added-to-cart-on`);
          }, 2000);
          
    
          //  --------------------------------------------------------- list of objects of differents timeout regenrated
          timeOuts[index] = {                              
            on: addedToCartONTimeOut,
            off: addedToCartOFFTimeOut
          }
        }
}



//////////////////////////////////// Make search bar interactive /////////////////////////////////////////////////
//create new url with parameters 
document.querySelector('.js-search-icon-button').addEventListener('click',()=>{
  const searchInput = document.querySelector('.js-search-input').value
    window.location.href = `amazon.html?search=${searchInput}`
})


// add Enter + Escape keydown event listeners to search bar 
const searchInput = document.querySelector('.js-search-input')
searchInput.addEventListener('keydown',(event)=>{
  if (event.key==='Enter'){
    window.location.href = `amazon.html?search=${searchInput}`
  } else if (event.key==='Escape'){
    document.querySelector('.js-search-input').value='';
  }
});



// use parameters to render only searched items
loadProductFetch().then(()=>{
  search()
})


// function that takes searched value and render similar products
function search(){
  
  const url = new URL(window.location.href);
  
  let searchedValue = url.searchParams.get('search')===null ? '' : (url.searchParams.get('search')).trim().toLocaleLowerCase()
  console.log(searchedValue);

  const filteredProducts = products.filter(product=>{
    const productName = (product.name).trim().toLowerCase();
    return productName.includes(searchedValue);
  })

  if (filteredProducts){
    renderProductsGrid(filteredProducts);
  }
  
}

