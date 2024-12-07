
export let cart = JSON.parse(localStorage.getItem('CartItem')) || [ ]


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
export function AddToCart(productId, index){
  let matchingItem;
  cart.forEach(cartItem => {
    // if car item = product we want to add => matching = item
    if (productId=== cartItem.productId){
      matchingItem = cartItem;
    } 
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
      productId,
      quantity: ItemsNumber
  });
  }
  saveCartItem()
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////// Function to save the cart items /////////////////////////////////////////
export function saveCartItem(){
  localStorage.setItem('CartItem', JSON.stringify(cart))
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