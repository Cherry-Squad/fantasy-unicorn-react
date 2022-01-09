export const numberWithCommas = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const addSign = (num) => {
  let n = +num;
  if (n <= 0) {
    return n;
  } else {
    return `+${n}`;
  }
};
