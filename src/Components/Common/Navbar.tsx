import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ProfileImage from "./ProfileImage"; 
import {useAuth} from "../Authentication";

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}
interface UserProfile {
  firstname: string;
  picture?: string;
}

function Navbar() {
  const {logout} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const storedFirstname = localStorage.getItem("firstname");
    const googleUserData = localStorage.getItem("user");

    if (googleUserData) {
      try {
        const user: GoogleUser = JSON.parse(googleUserData);
        return {firstname: user.name, picture: user.picture};
      } catch (error) {
        console.error("Failed to parse Google user:", error);
        return null;
      }
    } else if (storedFirstname) {
      return {firstname: storedFirstname};
    }

    return null; 
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.storageArea === localStorage) {
        const storedFirstname = localStorage.getItem("email");
        const googleUserData = localStorage.getItem("user");

        if (googleUserData) {
          try {
            const user: GoogleUser = JSON.parse(googleUserData);
            setProfile({firstname: user.name, picture: user.picture});
          } catch (error) {
            console.error("Failed to parse Google user:", error);
            setProfile(null);
          }
        } else if (storedFirstname) {
          setProfile({firstname: storedFirstname});
        } else {
          setProfile(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logout(); 
    localStorage.clear();
    setProfile(null); 
    console.log("Logged out, profile:", profile); 
    navigate("/", {replace: true});
  };

  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log(isAuthenticated);

  const handleSignin = () => {
    navigate("/signin");
  };

  if (location.pathname === "/signin" || location.pathname === "/signup") {
    return null; 
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full p-3 shadow-sm bg-cyan-600">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold tracking-tight text-white">
            <img src="/expense.png" alt="ExpenseTracker logo" className="w-8 h-8" />
            <span>ExpenseTracker</span>
          </Link>

          <div className="items-center hidden space-x-8 md:flex">
            <Link
              to="/"
              className="text-xl font-semibold text-white transition hover:text-cyan-700">
              Home
            </Link>
            <Link
              to="/Dashboard"
              className="text-xl font-semibold text-white transition hover:text-cyan-700">
              Dashboard
            </Link>
            <Link
              to="/Currency"
              className="text-xl font-semibold text-white transition hover:text-cyan-700">
              Currency Converter
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {profile ? (
              <>
                {profile && <ProfileImage name={profile.firstname} />}
                <span className="text-sm font-medium text-white">
                  Welcome, {profile.firstname || "Guest"}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-white transition bg-red-400 rounded-md shadow-md cursor-pointer hover:bg-red-500">
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleSignin}
                className="px-5 py-2 text-white transition rounded-md shadow-md cursor-pointer bg-cyan-500 hover:bg-cyan-700">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
