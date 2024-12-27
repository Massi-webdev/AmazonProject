export const orders = JSON.parse(localStorage.getItem('orders')) || []


export function addOrder(order){
  orders.unshift(order);
  saveOrdersToTtorage();
  console.log(orders);
}

function saveOrdersToTtorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}