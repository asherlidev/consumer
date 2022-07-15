export const amountToText = (amount: number): string => {
  // This function will represent an amount with decimals using only two decimals,
  // and will omit the decimals part if it doesn't have decimals
  const hasDecimals = Math.abs(amount) - Math.floor(amount) > 0;
  return hasDecimals ? amount.toFixed(2) : amount.toString();
};
