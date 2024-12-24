import formatCurrency from "../script/utils/money.js";

export function getProduct(productId) {
  //----------------------Comparaison
  let matchingProduct; 
  
  products.forEach((product)=>{ 
    if(product.id === productId){
      matchingProduct = product;
    }
  });
  return matchingProduct;
}

///////////////////////////////////////////////////////////Parent Class/////////////////////////////////////////////////////////
/// Converting products OBJECT into a Product class   - Why ?  -> to get class features and use them for an object
export class Product{

  constructor(productDetail){
    this.id = productDetail.id;
    this.image = productDetail.image;
    this.name = productDetail.name;
    this.rating = productDetail.rating;
    this.priceCents =productDetail.priceCents;
  }

  getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  };

  getPrice(){
    return formatCurrency(this.priceCents);
  };

  extraInfoHTML(){
    return ``
  }
};



//////////////////////////////////////////////////////// Child Class  INHERITANCE ///////////////////////////////////////////////
// We are creating a child class for clothing,  using parent class of product ---------------------------------------------------
export class Clothing extends Product{
  sizeChartLink;
  
  constructor(productDetails){

    super(productDetails); //call parent constructor to get the parent properties

    this.sizeChartLink = productDetails.sizeChartLink;
  }

  ///////////////////////////////////////////// POLYMORPHISM  + METHOD OverRiding ///////////////////////////////////////////////
  // Method overRiding              => replace similar parent method
  extraInfoHTML(){
    //super.extraInfoHTML();        => to access parent method
    return `<a href="${this.sizeChartLink}" target="_blank"> Size chart </a>`
  }
}



export class Appliance extends Product {

  instructionsLink;
  warrantyLink;

  constructor(productDetails){
    super(productDetails); //call parent constructor to get the parent properties

    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML(){                //POLYMORPHISM  + METHOD OverRiding
    return `<a href="${this.instructionsLink}" target="_blank"> Instructions </a>  
            <a href="${this.warrantyLink}" target="_blank"> Warranty </a>
           `
  }
}


//******************************Load products using XMLHttpRequest + callback functions***************************
export let products = [];

export function loadProduct(fun){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load',() => {
    products = xhr.response;
    products = JSON.parse(products);
    products = products.map(productDetail=>{
      if(productDetail.type==='clothing'){
        return new Clothing (productDetail);
      } 
      else if (productDetail.type === 'appliances'){
        return new Appliance(productDetail);
      }
      else{
        return new Product (productDetail);
      }
    });
    fun();
  });
  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////