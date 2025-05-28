import {useEffect, useState} from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import {useCurrencies} from "../../Hooks/useCurrencies";
import {useCurrencyConversion} from "../../Hooks/useCurrencyConversion";
import {CurrencySymbols} from "../../utils/CurrencySymbols";

const getSymbol = (code: string) => CurrencySymbols[code] || "";
const RECENT_KEY = "recentCurrencies";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [recent, setRecent] = useState<string[][]>([]);
  const [error, setError] = useState<string | null>(null);

  const {data: currencies = [], isLoading: currenciesLoading} = useCurrencies();
  const {mutate: convertCurrency, data: result, isPending: isConverting} = useCurrencyConversion();

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_KEY);
    if (stored) setRecent(JSON.parse(stored));
  }, []);

  const handleConvert = () => {
    if (amount === "" || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    if (fromCurrency === toCurrency) {
      setError("From and To currencies cannot be the same");
      return;
    }

    setError(null);
    convertCurrency({amount: Number(amount), from: fromCurrency, to: toCurrency});

    const pair = [fromCurrency, toCurrency];
    const updatedRecent = [
      pair,
      ...recent.filter(([f, t]) => !(f === fromCurrency && t === toCurrency)),
    ].slice(0, 5);
    setRecent(updatedRecent);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updatedRecent));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #EEF2FF, #FFFFFF)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          mb: 6,
          bgcolor: "#FFFFFF",
          borderRadius: 4,
          boxShadow: 6,
        }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" color="#0891b2" mb={2}>
          Currency Converter
        </Typography>

        {/* Amount Input */}
        <TextField
          fullWidth
          label="Amount"
          type="number"
          value={amount}
          inputProps={{min: 1}}
          onChange={(e) => {
            const val = e.target.value;
            setAmount(val === "" ? "" : Number(val));
            setError(null);
          }}
          InputProps={{
            startAdornment: (
              <span style={{marginRight: 8, color: "#6B7280"}}>{getSymbol(fromCurrency)}</span>
            ),
          }}
          sx={{mb: 3, borderColor: "#6B7280"}}
        />

        {/* Currency Select */}
        <Stack direction="row" spacing={2} mb={3}>
          <Box flex={1}>
            <Typography fontWeight="500" mb={0.5}>
              From
            </Typography>
            <Select
              value={fromCurrency}
              fullWidth
              onChange={(e) => setFromCurrency(e.target.value)}>
              {currencies.map((cur) => (
                <MenuItem key={cur} value={cur}>
                  {cur} {getSymbol(cur)}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box flex={1}>
            <Typography fontWeight="500" mb={0.5}>
              To
            </Typography>
            <Select value={toCurrency} fullWidth onChange={(e) => setToCurrency(e.target.value)}>
              {currencies.map((cur) => (
                <MenuItem key={cur} value={cur}>
                  {cur} {getSymbol(cur)}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Stack>

        {/* Swap Button */}
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            setFromCurrency(toCurrency);
            setToCurrency(fromCurrency);
            setError(null);
          }}
          sx={{
            color: "#0891b2",
            borderColor: "#0891b2",
            fontWeight: 600,
            mb: 2,
            ":hover": {
              backgroundColor: "#EEF2FF",
            },
          }}>
          Swap Currencies
        </Button>

        {/* Convert Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleConvert}
          sx={{
            backgroundColor: "#06b6d4",
            fontWeight: 600,
            fontSize: "1rem",
            mb: 2,
            ":hover": {
              backgroundColor: "#0891b2",
            },
          }}>
          Convert
        </Button>

        {/* Result / Error / Loading */}
        {isConverting && (
          <Typography align="center" color="#0891b2" fontWeight={600}>
            <CircularProgress size={24} sx={{color: "#0891b2", mr: 1}} />
            Converting...
          </Typography>
        )}
        {error && (
          <Typography align="center" color="error" fontWeight={500}>
            {error}
          </Typography>
        )}
        {result !== undefined && !error && !isConverting && (
          <Box mt={2} textAlign="center">
            <Typography fontSize="1rem" color="text.secondary">
              Converted Amount:
            </Typography>
            <Typography fontSize="2rem" fontWeight="bold" color="green">
              {getSymbol(toCurrency)} {result.toFixed(2)}
            </Typography>
          </Box>
        )}

        {/* Recent */}
        {recent.length > 0 && (
          <Box mt={4}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Recently Used:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {recent.map(([from, to], idx) => (
                <Button
                  key={idx}
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setFromCurrency(from);
                    setToCurrency(to);
                    setError(null);
                  }}
                  style={{
                    margin: "3px",
                  }}
                  sx={{
                    fontSize: "0.75rem",
                    borderColor: "#0891b2",
                    color: "#0891b2",
                    ":hover": {backgroundColor: "#EEF2FF"},
                  }}>
                  {from} → {to}
                </Button>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CurrencyConverter;
