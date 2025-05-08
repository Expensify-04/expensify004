import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{firstname: string} | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("firstname");
    if (storedProfile) {
      try {
        setProfile({firstname: storedProfile});
      } catch (error) {
        console.error("Failed to parse profile from localStorage:", error);
        setProfile(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setProfile(null);
  };

  function handleSignin() {
    navigate("/signin");
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm mb-7">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link to="/" className="flex-shrink-0 text-2xl font-bold tracking-tight text-indigo-600">
            ExpenseTracker
          </Link>

          {/* Navigation Links */}
          <div className="items-center hidden space-x-8 md:flex">
            <a
              href="/"
              className="text-base font-semibold text-gray-700 transition hover:text-indigo-600">
              Home
            </a>
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

          {/* Login Button */}
          <div>
            {profile ? (
              <>
                <span>Welcome,{profile.firstname}</span>
                <Link
                  to="/signin"
                  onClick={handleLogout}
                  className="px-4 py-1 text-sm text-white bg-red-400 rounded hover:bg-red-400">
                  Logout
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={handleSignin}
                  className="px-5 py-2 text-white transition bg-indigo-600 rounded-md shadow-md cursor-pointer hover:bg-indigo-700">
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
