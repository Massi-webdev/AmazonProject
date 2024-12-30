import {products, loadProductFetch, getProduct } from "./products.js";
import {getOrder} from "./orders.js";
import {convertTime2} from "../script/utils/time.js";


const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');


loadProductFetch().then(()=>{
  trackOrder();
})

//*****************************************************Render tracked orders************************************************ */
function trackOrder(){
  
  let trackingHTML;

  const matchingProduct = getProduct(productId);
  const matchingOrder = getOrder(orderId);
  const orderProducts = matchingOrder.products;
  

  let matchedProductInOrder;
  orderProducts.forEach(orderProduct => {
    if (orderProduct.productId===productId){
      matchedProductInOrder=orderProduct;
    }

  });

  const orderDate = matchingOrder.orderTime;
  const deliveryDate = matchedProductInOrder.estimatedDeliveryTime;

  trackingHTML = 
  `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${convertTime2(deliveryDate)}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${matchedProductInOrder.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    </div>
  `
  document.querySelector(".main").innerHTML=trackingHTML;
}

