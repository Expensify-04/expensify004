import {useState} from "react";

import CurrencyConverter from "./Components/CurrencyConverter";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./Components/AppRouter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
