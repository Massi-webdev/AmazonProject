import { AddToCart, cart } from "../../../../data/cart.js"  

describe('Test suite: AddToCart', ()=>{
  it ('adds an existing product to the cart',()=>{
    
    //mock localstorage set item
    spyOn(localStorage, 'setItem');
    
    //create mock or fake version or our saved cart to be able to the test
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      }]);    //local storage support only strings
    });  
    console.log(localStorage.getItem('cart'));


    AddToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // expected to be called 1 time
    console.log((localStorage.setItem).calls.count());     // to see how many time it was called
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });



});