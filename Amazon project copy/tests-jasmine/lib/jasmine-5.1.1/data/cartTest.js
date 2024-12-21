import { AddToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../../../data/cart.js"  

describe('Test suite: AddToCart', ()=>{

  beforeEach(()=>{
    //mock/fake localstorage set item = to avoid saving items on cart after testing
    spyOn(localStorage, 'setItem');
  });

/*
  it ('adds an existing product to the cart',()=>{
    //create mock or fake version or our saved cart to be able to the test
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);           // ------------------------- local storage support only strings
    });  
    loadFromStorage();

    AddToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);        // expected to be called 1 time
    console.log((localStorage.setItem).calls.count());            // to see how many time it was called
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });
*/


  it('Remove from cart function', ()=>{
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    console.log(localStorage.getItem('cart'));
    loadFromStorage();
    
    AddToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c665");
    console.log(cart);
    
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart','[{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6","quantity":1,"deliveryOptionId":"1"},{"productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c665","quantity":1,"deliveryOptionId":"1"}]');
    
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c665');
    console.log(cart);
    expect(cart.length).toEqual(1);

    updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 3)
    console.log(cart);
    expect(cart[0].deliveryOptionId).toEqual(3);
  });
  
  

  afterEach(()=>{

  })

});