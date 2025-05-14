import img1 from '../assets/slide1 (1).png'
import img2 from '../assets/slide2.png'
import img3 from '../assets/slide3.png'
import React, {useEffect, useState} from "react";
import phone from "../assets/phone.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey} from "@fortawesome/free-solid-svg-icons";
import {GoogleLogin, type CredentialResponse} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import {useNavigate, Link} from "react-router-dom";
import {toast} from "react-toastify";
import { useAuth } from "./Authentication";
import Navbar from './Common/Navbar';

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string; 
}
const images = [
 img1,img2,img3
];

const Signin: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const {setIsLoggedIn} =useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handlePhoneNumber = () => {
    navigate("/phonenumber");
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleEmailSignin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Login successfully");
      console.log("before login");
      
      setIsLoggedIn(true);
      console.log("after login");
      
      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleGoogleLogin = (response: CredentialResponse) => {
    console.log("Google Login Response:", response);

    if (response.credential) {
      try {
        const decoded: GoogleUser = jwtDecode(response.credential);
        console.log("Decoded Google User:", decoded);

        localStorage.setItem("user", JSON.stringify(decoded));
        localStorage.setItem("isAuthenticated", "true");

        toast.success("Google login successful");
        setIsLoggedIn(true);

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
    <>
  
    <div className="flex">
    
       <div>
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex}`}
          className="w-[700px] h-[640px] "
        />

        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-2xl"
          onClick={prevImage}
        >
          &#10094;
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-2xl"
          onClick={nextImage}
        >
          &#10095;
        </button>
      </div>

      <div className="">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`btn btn-xs mx-1 ${currentIndex === index ? 'bg-cyan-500' : 'bg-gray-300'}`}
          >
          </button>
        ))}
      </div>

 
      <div className="relative p-10  left-[70px] mt-[60px]">
        <h1 className=" text-5xl font-bold text-center text-cyan-500">Sign in</h1>
        <p className="mt-4 ml-3 text-xs text-center">Sign in with open account</p>

   
        <div className="flex gap-3 mt-3 mb-3">
          <GoogleLogin onSuccess={handleGoogleLogin}/>
          <button
            onClick={handlePhoneNumber}
            className="flex gap-3 p-2 border-2 rounded-lg border-slate-200 hover:bg-slate-100">
            <img src={phone} alt="Phone" className="w-6" /> Phone Number
          </button>
        </div>

        <hr />

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

            <div className="flex justify-between  mt-3">
              <label className="text-xs">
                <input type="checkbox" className="mr-1" /> Remember me
              </label>
              <p className="text-xs cursor-pointer hover:underline">Forgot Password?</p>
            </div>

            <button
              type="submit"
              className="bg-cyan-600 mt-3 p-2 w-[350px] rounded-xl text-xl text-white hover:bg-cyan-500">
              Sign in
            </button>
          </form>

          <p className="m-2 mt-4 text-sm text-center font-semibold">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-semibold text-cyan-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signin;
