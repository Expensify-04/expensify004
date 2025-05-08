import {useEffect, useState} from "react";
import {CurrencyUrl} from "../utils/ApiUrl";
import useCurrencyConverter from "../Hooks/useCurrencyConverter";
import {CurrencySymbols} from "../utils/CurrencySymbols";

// Utility to get symbol
const getSymbol = (code: string) => CurrencySymbols[code] || "";

const RECENT_KEY = "recentCurrencies";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [recent, setRecent] = useState<string[][]>([]);

  const {result, loading, convertCurrency} = useCurrencyConverter(amount, fromCurrency, toCurrency);

  // Fetch list of available currencies + Load recent
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

    const storedRecent = localStorage.getItem(RECENT_KEY);
    if (storedRecent) {
      setRecent(JSON.parse(storedRecent));
    }

    // Load dark mode from localStorage
    const storedDark = localStorage.getItem("darkMode");
    if (storedDark === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConvert = () => {
    convertCurrency();

    // Save to recent
    const pair = [fromCurrency, toCurrency];
    const updatedRecent = [
      pair,
      ...recent.filter(([f, t]) => !(f === fromCurrency && t === toCurrency)),
    ].slice(0, 5);
    setRecent(updatedRecent);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updatedRecent));
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl dark:bg-gray-900 dark:text-white">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-white">
          Currency Converter
        </h1>

        <button
          onClick={toggleDarkMode}
          className="w-full px-3 py-1 mb-4 text-sm font-medium text-indigo-600 border rounded hover:bg-indigo-100 dark:text-yellow-400 dark:border-yellow-400 dark:hover:bg-yellow-900">
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-indigo-900 dark:text-indigo-200">
            Amount
          </label>
          <div className="relative">
            <span className="absolute text-gray-500 left-3 top-2 dark:text-gray-400">
              {getSymbol(fromCurrency)}
            </span>
            <input
              type="number"
              value={amount}
              min="1"
              onChange={(e) => {
                const val = e.target.value;
                setAmount(val === "" ? "" : Number(val));
              }}
              className="w-full px-6 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-700 dark:text-indigo-200">
              From
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur} {getSymbol(cur)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-700 dark:text-indigo-200">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur} {getSymbol(cur)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={swapCurrencies}
          className="w-full px-3 py-2 mb-4 text-sm font-medium text-indigo-600 border rounded hover:bg-indigo-100 dark:text-yellow-400 dark:border-yellow-400 dark:hover:bg-yellow-900">
          Swap Currencies
        </button>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="w-full px-4 py-2 mb-4 font-semibold text-white transition duration-200 bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 hover:shadow-md dark:bg-yellow-500 dark:hover:bg-yellow-600">
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
            <p className="mb-2 text-lg font-medium text-gray-600 dark:text-gray-300">
              Converted Amount:
            </p>
            <p className="overflow-hidden text-4xl font-extrabold text-green-500 text-ellipsis whitespace-nowrap dark:text-green-400">
              {getSymbol(toCurrency)} {result.toFixed(2)}
            </p>
          </div>
        )}

        {/* Recent Currencies */}
        {recent.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-300">
              Recently Used:
            </h2>
            <div className="flex flex-wrap gap-2">
              {recent.map(([from, to], idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setFromCurrency(from);
                    setToCurrency(to);
                  }}
                  className="px-3 py-1 text-xs font-medium text-indigo-600 border border-indigo-400 rounded hover:bg-indigo-100 dark:text-yellow-400 dark:border-yellow-400 dark:hover:bg-yellow-900">
                  {from} → {to}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
