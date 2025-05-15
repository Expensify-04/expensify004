import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ProfileImage from "./ProfileImage"; 
import { useAuth } from "../Authentication";
type UserProfile = {
  email?: string;
  name?: string;
  picture?: string;
  phone?: string;
  firstName?: string;
  phoneNumber?: string;
} ;
type NavbarProfile = Omit<UserProfile,'name'|'phone'> &{
  firstname?:string
}
const maskPhoneNumber = (number: string): string => {
  const match = number.match(/(\+91-\d{2})(\d)(\d{2})-(\d{3})(\d)/);
  return match
    ? `${match[1]}${match[2]}**-***${match[5]}`
    : number.replace(/^(\d)(\d*)(\d)$/, (_, first, mid, last) =>
        `${first}${'*'.repeat(mid.length)}${last}`
      );
};
const Navbar =()=> {
  const {logout}=useAuth()
  const navigate = useNavigate();
  const location = useLocation();

  const [showDetails,setShowDetails]=useState(false)
  const [profile, setProfile] = useState<NavbarProfile|null>(() => {
    const storedFirstname = localStorage.getItem("firstname");
    const googleUserData = localStorage.getItem("user");
    const storedEmail =localStorage.getItem("email")
   const storedPhone = localStorage.getItem("phonenumber")
    if (googleUserData) {
      try {
        const user: UserProfile = JSON.parse(googleUserData);
        return {firstname: user.name, picture: user.picture, email: user.email || undefined, phoneNumber: user.phone};
      } catch (error) {
        console.error("Failed to parse Google user:", error);
        return null;
      }
    } else if (storedFirstname) {
      return {firstname: storedFirstname, email: storedEmail || undefined, phoneNumber: storedPhone || undefined};
    }

    return null; 
  });

 const toggleDetails=()=>{
  setShowDetails((prev)=>!prev)
 }
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.storageArea === localStorage) {
        const storedFirstname = localStorage.getItem("firstname");
        const googleUserData = localStorage.getItem("user");
 const storedEmail =localStorage.getItem("email")
   const storedPhone = localStorage.getItem("phone")
        if (googleUserData) {
          try {
            const user: UserProfile = JSON.parse(googleUserData);
            setProfile({firstname: user.name, picture: user.picture,email:user.email || undefined,phoneNumber:user.phone || undefined});
          } catch (error) {
            console.error("Failed to parse Google user:", error);
            setProfile(null);
          }
        } else if (storedFirstname) {
          setProfile({firstname: storedFirstname,email:storedEmail || undefined,phoneNumber:storedPhone || undefined});
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
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("email");
    localStorage.removeItem('phonenumber')
    localStorage.removeItem("password");
    localStorage.removeItem("user"); 
     logout();
    setProfile(null); 
    navigate("/",{replace:true});
  };
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  console.log(isAuthenticated)
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
          <Link to="/" className="flex-shrink-0 text-2xl font-bold tracking-tight text-white">
            ExpenseTracker
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
          <div className="flex items-center space-x-4 relative">
            {profile ? (
              <>
              <div className="flex items-center  cursor-pointer" onClick={toggleDetails}>
      <ProfileImage name={profile.firstname || ''} />
      <div className="text-white text-sm relative right-[100px] top-[15px] ">
        { showDetails && (
          <>
          <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-md p-3 text-center text-sm text-gray-800 z-10">
                 <div className="m-1"> Welcome, {profile.firstname}</div>
        {profile.phoneNumber && (
          <div className="m-1">Phone: {maskPhoneNumber(profile.phoneNumber)}</div>
        )}
        {profile.email && (
          <div className="m-1">Email: {profile.email}</div>
        )}
         <button
      onClick={handleLogout}
      className="px-5 py-2 text-white transition text-center bg-red-400 rounded-md shadow-md cursor-pointer hover:bg-red-500">
      Logout
    </button>
        </div>
       </>
        )}
      </div>
    </div>
</>
) : (
  <button
    onClick={handleSignin}
    className="px-5 py-2 text-white transition bg-cyan-500 rounded-md shadow-md cursor-pointer hover:bg-cyan-700">
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
