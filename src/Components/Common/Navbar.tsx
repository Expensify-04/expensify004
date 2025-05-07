import {Link, useNavigate} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link to="/" className="flex-shrink-0 text-2xl font-bold tracking-tight text-indigo-600">
            ExpenseTracker
          </Link>

          {/* Navigation Links */}
          <div className="items-center hidden space-x-8 md:flex">
            {/* <a href="#" className="text-gray-700 transition hover:text-indigo-600">Home</a> */}
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
          <div className="ml-4">
            <Link to="/login">
              <button className="px-5 py-2 text-white transition bg-indigo-600 rounded-md shadow-md cursor-pointer hover:bg-indigo-700">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
