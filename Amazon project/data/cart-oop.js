function Cart(localStorageKey){

  const cart = {

    cartItems:undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      }];
    },


    /////////////////////////////// Function to save the cart items /////////////////////////////////////////
    saveCartItem(){
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems))
    },


    ////////////////////////// Function to count Items on cart and render the number /////////////////////////
    updateCartQuntity(){
      let totatCartItem = 0;
      this.cartItems.forEach(item => {
        totatCartItem += item.quantity;
      });
      return totatCartItem;
    },


    ///////////////////////////////////// AddtoCart /////////////////////////////////////////////////////////
    AddToCart(productId){
      let matchingItem;
      this.cartItems.forEach(cartItem => {
        // if car item = product we want to add => matching = item
        if (productId=== cartItem.productId){
          matchingItem = cartItem;
        } 
      });

      //  number of items we want to add
      //let ItemsNumber = Number(document.querySelector(`.js-quntity-selector-${index}`).value)
      
      // if item already in the cart then just add +1
      if (matchingItem){
        matchingItem.quantity += 1;
      } 
      // else add it as new 
      else {
        this.cartItems.push({
          productId,
          quantity: 1,
          deliveryOptionId:'1',
      });
      }
      this.saveCartItem();
    },

    //////////////////////// Function remove item form car //////////////////////////////////////////////////
    removeFromCart(productId){
      const newCart = [];
      this.cartItems.forEach((cartItem)=>{
        if (cartItem.productId!==productId){
          newCart.push(cartItem);
        }
      })
      this.cartItems = newCart;
      this.saveCartItem();
    },

    ////////////////////////// Function update Delivery Option///////////////////////////////////////////////
    updateDeliveryOption(productId, deliveryOptionId){
      let matchingItem;

      this.cartItems.forEach(cartItem => {
          if (productId=== cartItem.productId){
          matchingItem = cartItem;
        } 
      });

      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveCartItem();
    }
  };

  return cart;
}


const cart = Cart('cart-oop');
const businessCart = Cart('businessCart');


cart.loadFromStorage();
businessCart.loadFromStorage();



console.log(cart.cartItems);
console.log(businessCart.cartItems);



