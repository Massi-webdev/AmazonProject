
let productsHTML = "";

products.forEach(product => {
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
                      <select class="js-quntity-selector">
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

                    <div class="js-added-to-cart"></div>

                    <button class="js-add-to-cart">Add to Cart</button>
              </div>
  `
})

document.querySelector(".all-products-container").innerHTML=productsHTML;