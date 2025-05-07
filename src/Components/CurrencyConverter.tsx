import {useEffect, useState} from "react";
import {CurrencyUrl} from "../utils/ApiUrl"; // Ensure this is correctly set
import useCurrencyConverter from "../Hooks/useCurrencyConverter";

// CurrencyConverter component
const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {result, loading, convertCurrency} = useCurrencyConverter(amount, fromCurrency, toCurrency);

  // Fetch list of available currencies
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await fetch(CurrencyUrl);
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
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Currency Converter</h1>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-indigo-900">Amount</label>
          <input
            type="number"
            value={amount}
            min="1"
            onChange={(e) => {
              const val = e.target.value;
              setAmount(val === "" ? "" : Number(val));
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* From and To Select */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-700">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-700">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
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
          className="w-full px-4 py-2 mb-4 font-semibold text-white transition duration-200 bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 hover:shadow-md">
          Convert
        </button>

        {/* Result Display */}
        {loading && (
          <div className="text-lg font-semibold text-center text-indigo-500 animate-pulse">
            Converting...
          </div>
        )}
        {error && <div className="font-medium text-center text-red-500">{error}</div>}
        {result !== null && !loading && !error && (
          <div className="mt-4 text-center">
            <p className="mb-2 text-lg font-medium text-gray-600">Converted Amount:</p>
            <p className="overflow-hidden text-4xl font-extrabold text-green-500 text-ellipsis whitespace-nowrap">
              {toCurrency} {result.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
