import {useEffect, useState} from "react";
import {ExchangeUrl} from "../utils/ApiUrl"; // Ensure this is correctly set

// Custom hook for handling currency conversion logic
const useCurrencyConverter = (amount: number, fromCurrency: string, toCurrency: string) => {
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const convertCurrency = async () => {
    if (fromCurrency === toCurrency) {
      setResult(amount);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
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
  }, [amount, fromCurrency, toCurrency]); // Automatically re-run on input change

  return {result, loading, error, convertCurrency};
};

// CurrencyConverter component
const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {result, loading, convertCurrency} = useCurrencyConverter(amount, fromCurrency, toCurrency);

  // Fetch list of available currencies
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await fetch(ExchangeUrl);
        const data = await res.json();
        setCurrencies(Object.keys(data).sort());
      } catch (err) {
        setError("Failed to load currencies");
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Currency Converter</h1>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block text-indigo-900	 font-medium mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            min="1"
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* From and To Select */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm">
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm">
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Convert Button */}
        <button
          onClick={convertCurrency}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow hover:shadow-md transition duration-200 mb-4">
          Convert
        </button>

        {/* Result Display */}
        {loading && (
          <div className="text-indigo-500 text-lg font-semibold text-center animate-pulse">
            Converting...
          </div>
        )}
        {error && <div className="text-red-500 text-center font-medium">{error}</div>}
        {result !== null && !loading && !error && (
          <div className="text-center mt-4">
            <p className="text-gray-600 mb-2 text-lg font-medium">Converted Amount:</p>
            <p className="text-4xl font-extrabold text-green-500">
              {toCurrency} {result.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
