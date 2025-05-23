import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},{
  id: '3',
  deliveryDays: 1,
  priceCents: 999 
}];

export function getDeliveryOption(deliveryOptionId) {
  let matchingOption;
  matchingOption = deliveryOptions.find( option => option.id === deliveryOptionId);

  return matchingOption || deliveryOptions[0]
}

export function calculateDate(option){
  const today = dayjs();
  let deliveryDate =  today.add(option.deliveryDays, 'days');
  const checkDate = deliveryDate.format('dddd');

  if(checkDate === 'Saturday') deliveryDate =  today.add(option.deliveryDays + 2, 'days');
  if(checkDate === 'Sunday') deliveryDate =  today.add(option.deliveryDays + 1, 'days');
  
  const dateString = deliveryDate.format('dddd, MMM DD');

  return dateString;
}