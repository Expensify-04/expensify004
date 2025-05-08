import {Outlet} from "react-router-dom";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-4" role="main">
        <Outlet /> {/* This renders the nested route (Home, CurrencyConverter, etc.) */}
      </main>
      <Footer /> {/* Footer shows on every page */}
    </div>
  );
}

export default Layout;
