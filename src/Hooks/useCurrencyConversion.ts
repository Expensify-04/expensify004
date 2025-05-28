import {useMutation} from "@tanstack/react-query";
import {ExchangeUrl} from "../utils/ApiUrl";

const convertCurrency = async ({
  amount,
  from,
  to,
}: {
  amount: number;
  from: string;
  to: string;
}): Promise<number> => {
  const res = await fetch(`${ExchangeUrl}amount=${amount}&from=${from}&to=${to}`);
  const data = await res.json();
  return data.rates[to];
};

export const useCurrencyConversion = () => {
  return useMutation({
    mutationFn: convertCurrency,
  });
};
