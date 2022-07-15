export default function convertHotelPriceToCredits(nightlyPrice: number) {
  const creditCost = nightlyPrice * 1.1;

  return creditCost;
}
