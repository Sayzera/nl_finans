// money format function tr

export const moneyFormat = (price: number) => {
  if (!price) return "0,00 ₺";

  const currency_symbol = "₺";
  const formattedOutput = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  });
  return formattedOutput.format(price).replace(currency_symbol, "") + " ₺";
};
