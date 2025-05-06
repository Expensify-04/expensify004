import {Outlet} from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This renders the nested route (Home, CurrencyConverter, etc.) */}
      <Footer /> {/* Footer shows on every page */}
    </>
  );
}

export default Layout;
