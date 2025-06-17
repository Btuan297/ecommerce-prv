import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function calculateArrivingDay(product) {
  let arrivingDate = dayjs(product.estimatedDeliveryTime);
  const checkDate = arrivingDate.format("dddd");
  if (checkDate === "Saturday") arrivingDate = arrivingDate.add(2, "days");
  if (checkDate === "Sunday") arrivingDate = arrivingDate.add(1, "days");
  const dateString = arrivingDate.format("MMM DD");
  return dateString;
}