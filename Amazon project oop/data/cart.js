
export let cart;
loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
    deliveryOptionId: '1'
  }];
};



////////////////////////// Function to count Items on cart and render the number /////////////////////////
export function updateCartQuntity(){
  let totatCartItem = 0;
  cart.forEach(item => {
    totatCartItem+=item.quantity;
  });
  
  return totatCartItem
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////// AddtoCart /////////////////////////////////////////////////////////
export function AddToCart(productId, selectedQuantity){
  let matchingItem;

  cart.forEach(cartItem => {
    // if car item = product we want to add => matching = item
    if (productId=== cartItem.productId){
      matchingItem = cartItem;
    } 
  });

  //  number of items we want to add
  //let ItemsNumber = Number(document.querySelector(`.js-quntity-selector-${index}`).value)
  
  // if item already in the cart then just add +1
  if (matchingItem){
    if (selectedQuantity){
      matchingItem.quantity += selectedQuantity;
    }
    else {
      matchingItem.quantity += 1;
    }
    
  } 
  // else add it as new 
  else {
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionId:'1',
  });
  }
  saveCartItem()
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////// Function to save the cart items /////////////////////////////////////////
export function saveCartItem(){
  localStorage.setItem('cart', JSON.stringify(cart))
}




//////////////////////// Function remove item form car //////////////////////////////////////////////////
export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem)=>{
    if (cartItem.productId!==productId){
      newCart.push(cartItem);
    }
  })
  cart = newCart;
}



////////////////////////// Function update Delivery Option///////////////////////////////////////////////
export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach(cartItem => {
      if (productId=== cartItem.productId){
      matchingItem = cartItem;
    } 
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveCartItem();
}