export const roundToDecimal = (n: number) => (value: number) => {
  const multiplier = n * 10;
  return Math.round(value * multiplier) / multiplier;
};

export const roundToFirstDecimal = roundToDecimal(1);
