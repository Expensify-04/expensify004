import {useEffect, useState} from "react";
import {ExchangeUrl} from "../utils/ApiUrl";

const useCurrencyConverter = (amount: number | "", fromCurrency: string, toCurrency: string) => {
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const convertCurrency = async () => {
    if (amount === "" || fromCurrency === "" || toCurrency === "") {
      setResult(null);
      return;
    }

    if (fromCurrency === toCurrency) {
      setResult(typeof amount === "number" ? amount : null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${ExchangeUrl}amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setResult(data.rates[toCurrency]);
    } catch (err) {
      setError("Failed to convert currency");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  return {result, loading, error, convertCurrency}; // <== ALWAYS return this object
};

export default useCurrencyConverter;
