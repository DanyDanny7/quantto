const getCardType = (number) => {
  // visa
  let vi = new RegExp("^4");
  if (number.match(vi) != null) return 1;

  // Mastercard
  let ma = new RegExp("^5");
  if (number.match(ma) != null) return 2;

  return 0;
}

export default getCardType;