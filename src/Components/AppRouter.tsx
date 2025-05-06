import {Route, Routes} from "react-router-dom";
// import Dashboard from "./Dashboard";
import CurrencyConverter from "./CurrencyConverter";
const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="/Dashboard" element={<Dashboard />} /> */}
      <Route path="/Currency" element={<CurrencyConverter />} />
    </Routes>
  );
};

export default AppRouter;
