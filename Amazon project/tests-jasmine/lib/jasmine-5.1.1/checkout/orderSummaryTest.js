import { renderOrderSummary } from "../../../../script/checkout/orderSummary.js";
import { AddToCart, cart, loadFromStorage } from "../../../../data/cart.js";
import { updateCheckoutHeader } from "../../../../script/checkout/checkoutHeader.js";


describe('test suite: Render Order Summary',()=>{
  it('displays the cart', ()=>{

    document.querySelector('.js-test-container').innerHTML=
    `
    <div class="js-cart-summary"> </div>
    `

    spyOn(localStorage, 'setItem');


    const productID1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: productID1,
        quantity: 1,
        deliveryOptionId: '1'
      }
      ]);    //local storage support only strings
    });  
    loadFromStorage();

    renderOrderSummary();
    expect(document.querySelectorAll('.js-cart-summary')).length =1;
    expect(document.querySelector(`.item-quantity-${productID1}`).innerText).toContain('Quantiy: 1');
  });


  it('removes a product',()=>{
    
    document.querySelector('.js-test-container').innerHTML=
    `
    <div class="js-cart-summary"> </div>
    `

    spyOn(localStorage, 'setItem');


    const productID1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([
        {
        productId: productID1,
        quantity: 1,
        deliveryOptionId: '1'
        }
      ]);    //local storage support only strings
    });  
    loadFromStorage();
    renderOrderSummary();
  })
});