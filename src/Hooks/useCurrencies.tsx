import {useQuery} from "@tanstack/react-query";
import {CurrencyUrl} from "../utils/ApiUrl";

const fetchCurrencies = async (): Promise<string[]> => {
  const res = await fetch(CurrencyUrl);
  const data = await res.json();
  return Object.keys(data).sort();
};

export const useCurrencies = () => {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });
};
