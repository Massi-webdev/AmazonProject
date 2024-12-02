///////////////////// generate products HTML ///////////////////////////////////////////
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
                        <img src="images/ratings/rating-${(product.rating.stars)*10}.png" alt="" class="product-rank-image">
                        <div class="production-rating-count">${product.rating.count}</div>
                    </div>

                    <div class="product-price-container">
                        ${(product.priceCents/100).toFixed(2)} $
                    </div>
                    
                    <div class="product-quntity-container"> 
                      <select class="js-quntity-selector js-quntity-selector-${index}">
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

                    <div class="js-added-to-cart js-added-to-cart-off-${index}">
                      <img src="images/icons/checkmark.png" alt="" class="added-icon">
                      Added
                    </div>

                    <button class="js-add-to-cart-button js-add-to-cart-button-${index}" data-product-image="${product.image}" data-product-id="${product.id}" data-product-price="${product.priceCents}">Add to Cart</button>
              </div>
  `
})

document.querySelector(".all-products-container").innerHTML=productsHTML;

/*
let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
console.log(cart);*/
   
//////////////// Make ADD to CART interactive //////////////////////////////////////////////////////

document.querySelectorAll(".js-add-to-cart-button").
  forEach((AddToCartButton, index) => {
    AddToCartButton.addEventListener('click', ()=>{

      const productId = AddToCartButton.dataset.productId;  //store data in variable
      const productImage = AddToCartButton.dataset.productImage; //store data in variable
      const productPrice = AddToCartButton.dataset.productPrice; //store data in variable

      let matchingItem;

      cart.forEach(item => {
        // if car item = product we want to add => matching = item
        if (productId=== item.id){
          matchingItem = item;
        } 
        console.log('matchingItem')
      });
    
      //  number of items we want to add
      let ItemsNumber = Number(document.querySelector(`.js-quntity-selector-${index}`).value)
      
      
      // if item already in the cart then just add +1
      if (matchingItem){
        matchingItem.quantity += ItemsNumber;
      } 
      // else add it as new 
      else {
        cart.push({
          image: productImage,
          id: productId,
          price: productPrice,
          quantity: ItemsNumber
      });
      }

     // localStorage.setItem('cartItems', JSON.stringify(cart))
    
      console.log(cart);

      ///// Added to cart Message ///
      let addedToCartONTimeOut;
      let addedToCartOFFTimeOut;

      addedToCartONTimeOut = setTimeout(() => {
        document.querySelector(`.js-added-to-cart-off-${index}`).classList.add(`js-added-to-cart-on`);
        //addedToCart=true;
        
      }, 0);

      addedToCartOFFTimeOut = setTimeout(() => {
        document.querySelector(`.js-added-to-cart-off-${index}`).classList.remove(`js-added-to-cart-on`);
        //addedToCart=false;
        
      }, 2000);
      
  })

})