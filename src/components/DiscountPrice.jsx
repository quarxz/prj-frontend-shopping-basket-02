export function DiscountPrice({ totalPrices }) {
  console.log(totalPrices);
  return <span>{totalPrices.basket_total_discount.toFixed(2)} €</span>;
}
