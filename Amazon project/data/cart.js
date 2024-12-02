const cart = [

];


let cartItemsHTML = '';
cart.forEach(item => {

  cartItemsHTML+=
  `
              <div class="js-cart-item">

                <div class="delivery-date"> Delivery Date: <span class="js-delivery-date">Tuesday, December 10</span> </div>

                <div class="Cart-item-details-grid">
                  <img src="images/products/6-piece-non-stick-baking-set.webp" alt="" style="width: 150px; height: 150px;">
                  <div class="cart-item-details">
                    <div class="item-name">Adult Plain Cotton T-Shirt - 2 Pack</div>
                    <div class="item-price">$7.99</div>
                    <div class="item-quantity">
                      <span>Quantiy: 7 </span> 
                      <span>Update</span>
                      <span>Delete</span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">Choose a delivery option:</div>

                    <div class="js-delivery-option">
                      <input type="radio">
                      <div>
                        <div class="delivery-option-date"> Tuesday, December 10 </div>
                        <div class="delivery-option-date"> Free Shipping</div>
                      </div>
                    </div>

                    <div class="js-delivery-option">
                      <input type="radio">
                      <div>
                        <div class="delivery-option-date"> Tuesday, December 10 </div>
                        <div class="delivery-option-date"> Free Shipping</div>
                      </div>
                    </div>

                    <div class="js-delivery-option">
                      <input type="radio">
                      <div>
                        <div class="delivery-option-date"> Tuesday, December 10 </div>
                        <div class="delivery-option-date"> Free Shipping</div>
                      </div>
                    </div>

                  </div>
                  <div></div>
                </div>
            </div>
  `
  document.querySelector('.js-cart-item').innerHTML= cartItemsHTML
});