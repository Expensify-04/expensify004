// src/Components/Signin.tsx

import React, {useState} from "react";
import img from "../assets/sigin.png";
import phone from "../assets/phone.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey} from "@fortawesome/free-solid-svg-icons";
import {GoogleLogin, type CredentialResponse} from "@react-oauth/google";

const Signin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Google Login handler
  const handleGoogleLogin = (response: CredentialResponse) => {
    console.log("JWT Token", response.credential);
    // Mark user as authenticated
    localStorage.setItem("isAuthenticated", "true");
    // Redirect to dashboard
    window.location.href = "/dashboard";
  };

  // Email/Password login handler (dummy logic)
  const handleEmailLogin = () => {
    if (email && password) {
      // Dummy auth success
      localStorage.setItem("isAuthenticated", "true");
      window.location.href = "/dashboard";
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <div className="flex">
      {/* Left Image */}
      <div className="relative flex justify-center top-8 left-10">
        <img src={img} alt="Signin" />
      </div>

      {/* Signin Form */}
      <div className="p-10 mt-10 relative left-[300px]">
        <h1 className="m-3 text-4xl font-bold">Sign in</h1>
        <p className="mt-4 ml-3 text-xs">Sign in with open account</p>

        {/* Google & Phone Buttons */}
        <div className="flex mt-3 mb-3">
          <GoogleLogin onSuccess={handleGoogleLogin} />
          <button className="flex gap-3 p-2 m-1 font-semibold rounded-lg opacity-75 bg-slate-200 hover:bg-slate-300">
            <img src={phone} alt="Phone" className="w-6" /> Phone Number
          </button>
        </div>

        <hr />

        {/* Email/Password Form */}
        <div className="flex flex-col mt-3">
          <p>Or continue with email address</p>

          <div className="relative">
            <input
              type="email"
              className="w-full py-2 pl-10 mt-3 outline-none bg-slate-200 rounded-xl"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2"
            />
          </div>

          <div className="relative mt-3">
            <input
              type="password"
              className="w-full py-2 pl-10 outline-none bg-slate-200 rounded-xl"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faKey}
              className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2"
            />
          </div>

          <div className="flex justify-between mt-3">
            <label className="text-xs">
              <input type="checkbox" className="mr-1" /> Remember me
            </label>
            <p className="text-xs cursor-pointer hover:underline">Forgot Password?</p>
          </div>

          <button
            onClick={handleEmailLogin}
            className="p-2 mt-3 text-xl text-white bg-blue-300 rounded-xl hover:text-black">
            Sign in
          </button>

          <p className="m-2 ml-10 text-sm">
            Don't have an account?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
