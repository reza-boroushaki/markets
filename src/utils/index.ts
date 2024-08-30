export const currencySymbol = (currency: string, number: string) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format(Number(number));
};
