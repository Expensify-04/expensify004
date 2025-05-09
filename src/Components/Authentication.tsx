import { createContext , useContext, useEffect, useState} from "react";
import type { ReactNode } from "react";

import type { Dispatch, SetStateAction } from "react";

interface AuthenticationProps {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    logout:()=> void;
    
}

const AuthContext = createContext<AuthenticationProps | undefined>(undefined);

export const AuthProvider =({children} :{children: ReactNode}) =>{
    const[isLoggedIn,setIsLoggedIn]=useState<boolean>(false);
   useEffect(()=>{
    const authStatus =localStorage.getItem("isAuthenticated");
    setIsLoggedIn(authStatus === "true")
   },[])

   const logout =()=>{
    localStorage.removeItem("isAuthenticated");
    // localStorage.removeItem("firstname");
    setIsLoggedIn(false)
   }

   return(
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn,logout}}>{children}</AuthContext.Provider>
   )
}
export const useAuth=()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within Authprovider")
    }
    return context;
}
