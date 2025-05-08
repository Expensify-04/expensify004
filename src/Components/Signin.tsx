// src/Components/Signin.tsx

import React, {useState} from "react";
import img from "../assets/sigin.png";
import phone from "../assets/phone.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey} from "@fortawesome/free-solid-svg-icons";
import {GoogleLogin, type CredentialResponse} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import {useNavigate, Link} from "react-router-dom";
import {toast} from "react-toastify";

// Interface for Google decoded token
interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string; // Google user ID
}

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handlePhoneNumber = () => {
    navigate("/phonenumber");
  };

  // Email/Password login handler
  const handleEmailSignin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Login successfully");
      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password");
    }
  };

  // Google login handler
  const handleGoogleLogin = (response: CredentialResponse) => {
    console.log("Google Login Response:", response);

    if (response.credential) {
      try {
        const decoded: GoogleUser = jwtDecode(response.credential);
        console.log("Decoded Google User:", decoded);

        // Store user details locally
        localStorage.setItem("user", JSON.stringify(decoded));
        localStorage.setItem("isAuthenticated", "true");

        toast.success("Google login successful");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error decoding Google token:", error);
        toast.error("Google login failed");
      }
    } else {
      toast.warn("No credential received from Google login");
    }
  };

  return (
    <div className="flex">
      {/* Left Image */}
      <div className="relative flex justify-center top-8 left-10">
        <img src={img} alt="Signin" />
      </div>

      {/* Signin Form */}
      <div className="relative p-10 mt-10 left-44">
        <h1 className="m-3 text-4xl font-bold">Sign in</h1>
        <p className="mt-4 ml-3 text-xs">Sign in with open account</p>

        {/* Google & Phone Buttons */}
        <div className="flex gap-3 mt-3 mb-3">
          <GoogleLogin onSuccess={handleGoogleLogin} />
          <button
            onClick={handlePhoneNumber}
            className="flex gap-3 p-2 border-2 rounded-lg border-slate-200 hover:bg-slate-100">
            <img src={phone} alt="Phone" className="w-6" /> Phone Number
          </button>
        </div>

        <hr />

        {/* Email/Password Form */}
        <div className="flex flex-col mt-3">
          <p>Or continue with email address</p>

          <form onSubmit={handleEmailSignin}>
            <div className="relative mt-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-200 rounded-xl pl-10 py-2 w-[350px] outline-none"
                required
                placeholder="Email"
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2"
              />
            </div>

            <div className="relative mt-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-200 rounded-xl pl-10 py-2 w-[350px] outline-none"
                required
                placeholder="Password"
              />
              <FontAwesomeIcon
                icon={faKey}
                className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2"
              />
            </div>

            <div className="flex justify-between m-2 mt-3">
              <label className="text-xs">
                <input type="checkbox" className="mr-1" /> Remember me
              </label>
              <p className="text-xs cursor-pointer hover:underline">Forgot Password?</p>
            </div>

            <button
              type="submit"
              className="bg-blue-300 mt-3 p-2 w-[350px] rounded-xl text-xl text-white hover:text-black">
              Sign in
            </button>
          </form>

          <p className="m-2 mt-4 text-sm text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
