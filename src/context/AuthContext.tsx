import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import cookies from "js-cookie";

interface UserContextType {
  userId: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);


interface UserProviderProps {
  children: ReactNode;
}


export const UserProvider = ({ children }: UserProviderProps) => {
  const [userId, setUserId] = useState<string | null>(null);

     useEffect(() => {
       async function fetchUser() {
         try {
           const token = cookies.get("token");
   
           const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`, {
             method: "POST",
             credentials: "include",
             headers: { Cookie: token ? `token=${token}` : "" },
           });
   
           const data = await res.json();
           setUserId(data.user.userId.id)
   
           if (!data.user) {
      
             return;
           }
  
         } catch (error) {
           console.error("Authentication error:", error);

         }
       }
   
       fetchUser();
     }, []);


  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user data
export const useUser = (): UserContextType | undefined => useContext(UserContext);
