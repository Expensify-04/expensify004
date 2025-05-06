import {Link, useNavigate} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <Link to="/" className="flex-shrink-0 text-indigo-600 text-2xl font-bold tracking-tight">
            ExpenseTracker
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {/* <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Home</a> */}
            <Link
              to="/Dashboard"
              className="text-gray-700 text-base hover:text-indigo-600 transition font-semibold">
              Dashboard
            </Link>
            <Link
              to="/Currency"
              className="text-gray-700 text-base hover:text-indigo-600 transition font-semibold">
              Currency Converter
            </Link>
          </div>

          {/* Login Button */}
          <div className="ml-4">
            <Link to="/login">
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition shadow-md cursor-pointer">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
