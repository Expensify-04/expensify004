import {FaInstagram, FaTwitter, FaFacebook} from "react-icons/fa";

function Footer() {
  return (
    <>
      {" "}
      {/* Hero Section */}
      {/* Footer */}
      <footer className="py-3 mt-0 text-center border-t  border-cyan-300 bg-cyan-50">
        <div className="flex justify-center gap-6 mb-1 text-xl text-cyan-700">
          <FaInstagram className="transition hover:text-pink-500" />
          <FaTwitter className="transition hover:text-blue-500" />
          <FaFacebook className="transition hover:text-blue-700" />
        </div>
        <p className="text-sm text-cyan-700">&copy; 2025 Expense Tracker</p>
      </footer>
    </>
  );
}

export default Footer;
