import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"

export function convertTime1(date){
  return dayjs(date).format('MMMM D');
}

export function convertTime2(date){
  return dayjs(date).format('dddd, MMMM D');
}