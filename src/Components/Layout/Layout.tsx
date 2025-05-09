import {Outlet} from "react-router-dom";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import { useEffect } from "react";
import { useAuth } from "../Authentication";

const Layout=()=> {
  const {isLoggedIn}=useAuth();

  useEffect(()=>{
    console.log("login state ",isLoggedIn);
    
  },[isLoggedIn])
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <main className="flex-grow pt-4" role="main">
        <Outlet /> {/* This renders the nested route (Home, CurrencyConverter, etc.) */}
      </main>
      <Footer /> 
    </div>
  );
}

export default Layout;
