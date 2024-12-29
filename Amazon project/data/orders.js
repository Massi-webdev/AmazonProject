import { getProduct, loadProductFetch } from "./products.js"; ""
import formatCurrency from "../script/utils/money.js";
import { convertTime } from "../script/utils/time.js";
import { AddToCart, updateCartQuntity, saveCartItem } from "./cart.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || []



//***************************************************** Push new order **************************************
export function addOrder(order){
  orders.unshift(order);
  saveOrdersToTtorage();
  console.log(orders);
}



//*********************************** Render orders list on orders.html *************************************
loadProductFetch().then(()=>{
  renderOrders();
}) //Need to load products first then get all the info to render it on the orders page

console.log(orders)


let ordersHTML = '';
let productsInOrdersHTML = '';

function renderOrders(){
    
    orders.forEach((order) => {

      const orderProducts = order.products
      const orderTime = order.orderTime;
      const orderTotalPrice = order.totalCostCents
      const orderId = order.id
  
      //read all products in a specific order and create its html
      orderProducts.forEach((product)=>{
        
        const productId = product.productId
        const matchingProduct = getProduct(productId);
  
        const deliveryDate = product.estimatedDeliveryTime;
        const productQuantity = product.quantity;
        const productImage = matchingProduct.image;
        const productName = matchingProduct.name;
        
  
        productsInOrdersHTML += 
        `<div class="order-details-grid order-details-grid-${orderId}">
              <div class="product-image-container">
                <img src="${productImage}">
              </div>
  
              <div class="product-details" >
  
                  <div class="product-name">
                    ${productName}
                  </div>
  
                  <div class="product-delivery-date">
                    Arriving on: ${convertTime(deliveryDate)}
                  </div>
  
                  <div class="product-quantity">
                    Quantity: ${productQuantity}
                  </div>
  
                  <button class="buy-again-button button-primary"  data-product-id=${productId}>
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                  </button>
              </div>
  
              <div class="product-actions">
                  <a href="tracking.html">
                    <button class="track-package-button button-secondary">
                      Track package
                    </button>
                  </a>
              </div>   
        </div>
        `
      })
  
      
      ordersHTML+= 
      `
      <div class="order-container order-container-${orderId}">
  
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${convertTime(orderTime)}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$${formatCurrency(orderTotalPrice)}</div>
                </div>
              </div>
  
              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${orderId}</div>
              </div>
            </div>
  
            <div class="js-products-container">
              ${productsInOrdersHTML}
            </div>
            
      </div>
      `
      document.querySelector('.orders-grid').innerHTML = ordersHTML;
      productsInOrdersHTML=``; 
    });
    document.querySelector('.cart-quantity').innerHTML = updateCartQuntity();
    buyProductAgain();
  } 





//********************************** save orders *********************************************//
function saveOrdersToTtorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}




//********************************** make page interactive **********************************//
// ------ Buy Again Buttons----------
function buyProductAgain(){
  document.querySelectorAll('.buy-again-button').forEach(productButton=>{
  const productId = productButton.dataset.productId;

  productButton.addEventListener('click',()=>{
    AddToCart(productId);
    document.querySelector('.cart-quantity').innerText=updateCartQuntity();
    saveCartItem();
  })
})
}

