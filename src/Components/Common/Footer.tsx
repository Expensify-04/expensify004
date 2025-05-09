function Footer() {
  return (
    <footer className="bg-cyan-600 text-white px-5 py-9  ">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} ExpenseTracker. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
