//////////////////// Classes are object generators////////////////////
export class Cart {
  
  // class property, it's like an object propertie / variable 
  //cartItems = undefined;  we can simply declare -- cartItems;
  cartItems;         //   public property : can be accessed anywhere
  #localStorageKey;  // # private property : used only inside the class --- not outside 

  
  // Constructors : help us run code when creating an object
  // has to be named constructor    +    should not return anything
  // Good place to put setup code

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage(); 
  }
 



  // class method1 -----------------------------------------------------------
  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: '1'
    }];
  };

  // class method2 -----------------------------------------------------------
  saveCartItem(){
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
  };

  // class method3 -----------------------------------------------------------
  updateCartQuntity(){
    let totatCartItem = 0;
    this.cartItems.forEach(item => {
      totatCartItem += item.quantity;
    });
    return totatCartItem;
  };

  // class method4 -----------------------------------------------------------
  AddToCart(productId, selectedValue){
    let matchingItem;
    this.cartItems.forEach(cartItem => {
      if (productId=== cartItem.productId){
        matchingItem = cartItem;
      } 
    });

    if (matchingItem){
        if (selectedValue){
          matchingItem.quantity += selectedValue;
        } else {
          matchingItem.quantity += 1;
        }
    } 
    else {
      this.cartItems.push({
        productId,
        quantity: selectedValue,
        deliveryOptionId:'1',
    });
    }
    this.saveCartItem();
  };


  // class method5 -----------------------------------------------------------
  removeFromCart(productId){
    const newCart = [];
    this.cartItems.forEach((cartItem)=>{
      if (cartItem.productId!==productId){
        newCart.push(cartItem);
      }
    })
    this.cartItems = newCart;
    this.saveCartItem();
  };


  // class method6 -----------------------------------------------------------
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



// Syntax look like functions   +  new to create a new object
export const cart = new Cart('cart-oop');              // Each object we generate from a class, we call it instance of a classe.
const businessCart = new Cart('cart-business'); // Each object we generate from a class, we call it instance of a classe.

console.log(cart);
console.log(businessCart);

// To check if an object was generate by a class // a instance of a class
console.log(businessCart instanceof Cart)   // =>  True
console.log(!cart instanceof Cart)          // =>  False


console.log(cart.localStorageKey);
//console.log(businessCart.#localStorageKey);
// to avoid we add #before a property to make it private and not accessible from outside the class
// ERROR => Private field '#localStorageKey' must be declared in an enclosing class 





// Object Oriented Programming  = organizing our code into objects = To try to represent the real world
// Class  is a feature that helps us generate these objects   = Object Generatore

// -------------------------------------------- Why should we use it ? --------------------------------------------
// 1. Create cleaner objects

// 2. CONSTRUCTOR feature : let us run some setup code after creating an object
// --- on the class obove we wrote some codes after the class but a constractor allows us to put that code inside
// --- the classe  ==>  Makes the code more cleaner
