import {products, loadProductFetch, getProduct } from "./products.js";
import {getOrder} from "./orders.js";
import {convertTime2} from "../script/utils/time.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"



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
          <div class="progress-label js-preparing-status">
            Preparing
          </div>
          <div class="progress-label js-shipped-status">
            Shipped
          </div>
          <div class="progress-label js-delivered-status ">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    </div>
  `
  document.querySelector(".main").innerHTML=trackingHTML;
  
  showDeliveryProgress()
  function showDeliveryProgress(){

    const currentTime = dayjs();
    const orderTime = dayjs(orderDate);
    const deliveryTime = dayjs(deliveryDate);
    
    const DiffCurrentOrder = currentTime.diff(orderTime, 'hours')
    const DiffDeliveryOrder = deliveryTime.diff(orderTime, 'hours')
    
    
    const deliveryProgress = ((DiffCurrentOrder/DiffDeliveryOrder)*100).toFixed(2);
    //----------------Highlight progress label -------------------------------
    
    document.addEventListener('mouseenter',()=>{
        document.querySelector('.progress-bar').style.width=`${deliveryProgress}%`
    })
    
    function removeCurrentStatus(){
    document.querySelectorAll('.progress-label').forEach(label=>{
      label.classList.remove('current-status');
    })
    }
    
    if (deliveryProgress<=49){
    removeCurrentStatus()
    document.querySelector('.js-preparing-status').classList.add('current-status')
    
    } else if(deliveryProgress>=55 && deliveryProgress<=99){
    removeCurrentStatus();
    document.querySelector('.js-shipped-status').classList.add('current-status')
    
    } else{
    removeCurrentStatus();
    document.querySelector('.js-delivered-status').classList.add('current-status')
    }
  }

}