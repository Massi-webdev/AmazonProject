import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"

 export function setDeliveryDate(days){
      const today = dayjs().add(days, 'days').format('dddd');
      
      if (today==='Saturday'){
        return dayjs().add((days+2), 'days').format('dddd, MMMM DD');
      } 
      else if (today==='Sunday'){
        return dayjs().add((days+1), 'days').format('dddd, MMMM DD');
      } 
      else{
        return dayjs().add((days), 'days').format('dddd, MMMM DD');
      }
 }


export const deliveryOptions = [
  {
    id:'1',
    deliveryDays:7,
    priceCents:0
  },
  {
    id:'2',
    deliveryDays:3,
    priceCents:499
  },
  {
    id:'3',
    deliveryDays:1,
    priceCents:999
  }
];

export function getDeliveryOption(deliveryOptionId){
  let selectedDeliveryOption;

  deliveryOptions.forEach(option => {
    if (option.id===deliveryOptionId){ 
      selectedDeliveryOption = option;
    };   
  })
  return selectedDeliveryOption || deliveryOptions[0];
}