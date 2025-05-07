import {Outlet} from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow" role="main">
        <Outlet /> {/* This renders the nested route (Home, CurrencyConverter, etc.) */}
      </main>
      <Footer /> {/* Footer shows on every page */}
    </div>
  );
}

export default Layout;
