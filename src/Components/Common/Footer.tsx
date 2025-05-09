import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

function Footer() {
  return (
<>     {/* Hero Section */}
      

      {/* Footer */}
      <footer className=" mt-0 text-center py-3 border-t border-cyan-300 bg-cyan-50">
        <div className="flex justify-center  gap-6 mb-1 text-cyan-700 text-xl">
          <FaInstagram className="hover:text-pink-500 transition" />
          <FaTwitter className="hover:text-blue-500 transition" />
          <FaFacebook className="hover:text-blue-700 transition" />
        </div>
        <p className="text-sm text-cyan-700">&copy; 2025 Expense Tracker</p>
      </footer>
      </> 
  );
}

export default Footer;
