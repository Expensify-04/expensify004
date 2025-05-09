import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ProfileImage from "./ProfileImage"; // Import the ProfileImage component

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Lazy initialization of profile state from localStorage
  const [profile, setProfile] = useState<{firstname: string; picture?: string} | null>(() => {
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

    return null; // Default to null if no data is found
  });

  useEffect(() => {
    // Listen for localStorage changes to update the profile
    const handleStorageChange = (e: StorageEvent) => {
      if (e.storageArea === localStorage) {
        const storedFirstname = localStorage.getItem("firstname");
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
    // Clear everything on logout
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("user"); // Clear Google user too
    localStorage.removeItem("isAuthenticated");

    setProfile(null); // Immediately update the profile state to null
    navigate("/");
  };

  const handleSignin = () => {
    navigate("/signin");
  };

  if (location.pathname === "/signin" || location.pathname === "/signup") {
    return null; // Don't render the Navbar on the Signin page
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm mb-7">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0 text-2xl font-bold tracking-tight text-indigo-600">
            ExpenseTracker
          </Link>

          <div className="items-center hidden space-x-8 md:flex">
            <Link
              to="/"
              className="text-base font-semibold text-gray-700 transition hover:text-indigo-600">
              Home
            </Link>
            <Link
              to="/Dashboard"
              className="text-base font-semibold text-gray-700 transition hover:text-indigo-600">
              Dashboard
            </Link>
            <Link
              to="/Currency"
              className="text-base font-semibold text-gray-700 transition hover:text-indigo-600">
              Currency Converter
            </Link>
          </div>

          {/* Login/Logout Section */}
          <div className="flex items-center space-x-4">
            {profile ? (
              <>
                {/* Use ProfileImage component with dynamic name */}
                <ProfileImage name={profile.firstname} />
                <span className="text-sm font-medium text-gray-700">
                  Welcome, {profile.firstname}
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
                className="px-5 py-2 text-white transition bg-indigo-600 rounded-md shadow-md cursor-pointer hover:bg-indigo-700">
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
