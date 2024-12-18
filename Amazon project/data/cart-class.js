//////////////////// Classes are object generators////////////////////
class Cart {
  
  // class property, it's like an object propertie / variable 
  //cartItems = undefined;  we can simply declare -- cartItems;
  cartItems;
  localStorageKey;


  // Constructors : help us run code when creating an object
  // has to be named constructor    +    should not return anything
  // Good place to put setup code

  constructor(localStorageKey){

      // Since localStorageKey is undefined, We have have define local storage for each new object to generate object
      this.localStorageKey = localStorageKey;

      //Load cart from local storage
      this.loadFromStorage();

  }



  // class method1
  loadFromStorage() {          
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: '1'
    }];
  }

  // class method2
  saveCartItem(){
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems))
  }

  // class method3
  AddToCart(productId){
    let matchingItem;
    (this.cartItems).forEach(cartItem => {
      
      if (productId=== cartItem.productId){
        matchingItem = cartItem;
      } 
    });

    if (matchingItem){
      matchingItem.quantity += 1;
    } 
    else {
      (this.cartItems).push({
        productId,
        quantity: 1,
        deliveryOptionId:'1',
    });
    };
    this.saveCartItem()
  }

  // class method4
  updateCartQuntity(){
    let totatCartItem = 0;
    (this.cartItem).forEach(item => {
      totatCartItem+=item.quantity;
    });
    
    return totatCartItem
  }

  // class method5
  removeFromCart(productId){
    const newCart = [];
    (this.cartItem).forEach((cartItem)=>{
      if (cartItem.productId!==productId){
        newCart.push(cartItem);
      }
    })
    this.cartItems = newCart;
    this.saveCartItem();
  }

  // class method6
  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    (this.cartItem).forEach(cartItem => {
        if (productId=== cartItem.productId){
        matchingItem = cartItem;
      } 
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveCartItem();
  }

};


// Syntax look like functions   +  new to create a new object
const cart = new Cart('cart-oop');              // Each object we generate from a class, we call it instance of a classe.
const businessCart = new Cart('cart-business'); // Each object we generate from a class, we call it instance of a classe.

console.log(cart);
console.log(businessCart);

// To check if an object was generate by a class // a instance of a class
console.log(businessCart instanceof Cart)   // =>  True










// Object Oriented Programming  = organizing our code into objects = To try to represent the real world
// Class  is a feature that helps us generate these objects   = Object Generatore

// -------------------------------------------- Why should we use it ? --------------------------------------------
// 1. Craete cleaner objects

// 2. CONSTRUCTOR feature : let us run some setup code after creating an object
// --- on the class obove we wrote some codes after the class but a constractor allows us to put that code inside
// --- the classe  ==>  Makes the code more cleaner
