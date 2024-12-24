import { renderOrderSummary } from "../../../../script/checkout/orderSummary.js";
import { AddToCart, cart, loadFromStorage } from "../../../../data/cart.js";
import { updateCheckoutHeader } from "../../../../script/checkout/checkoutHeader.js";
import { loadProduct } from "../../../../data/products.js";

describe('test suite: Render Order Summary',()=>{
  
  const productID1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productID2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  
  beforeAll((done) =>{
    loadProduct(()=>{
      done(); // allow to control when to go to the next step
      //we can use done beforeEach and it
    });
  });

  beforeEach(()=>{ 
    document.querySelector('.js-test-container').innerHTML=
    `
      <div class="js-cart-summary"> </div>
      <div class="js-payment-summary"></div>
    `

    spyOn(localStorage, 'setItem');

    
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '1'
      },
      ]);    //local storage support only strings
    });  
    loadFromStorage();

    renderOrderSummary();
  });


  it('displays the cart', ()=>{
    expect(document.querySelectorAll('.js-cart-item').length).toEqual(2);
    expect(document.querySelector(`.item-quantity-${productID1}`).innerText).toContain('Quantiy: 1');

    //expect(localStorage.getItem).toHaveBeenCalledWith('cart', `[]`);
    
    document.querySelector(`.js-delete-item-${productID1}`).click();

    expect(document.querySelectorAll('.js-cart-item').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item${productID1}`)).not.toEqual(!null);
    expect(document.querySelector(`.js-cart-item${productID1}`)).toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productID2);

    expect(document.querySelector('.item-price').innerText).toContain('$20.95');
    
  });
  
  afterEach(()=>{
    document.querySelector('.js-test-container').innerHTML='' //delete all html to read clear results
  })
}); 