
'use client'
import * as React from "react";
import { Navigation } from "../../(web)/_Components/Navigation";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import ProfilePage from "./profile";
import DonationScreen from "./donation";
import cookies from "js-cookie";



export default function Page() {
  const [donorId, setDonorId] = useState<any>()


    useEffect(() => {
      async function fetchUser() {
        try {
          console.log(document.cookie, cookies.get());
  
  
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
            {
              method: "POST",
              credentials: "include",
              headers: { Cookie: cookies.get().toString() },
            }
          );
  
  
      
  
          const data = await res.json();
  
          console.log(data);
          setDonorId(data.user.userId.id);
  
  
        } catch (error) {
   
        }
      }
      fetchUser();
    }, []);


  return (
    <>

      <div className="w-full flex gap-8 absolute ">
       <ProfilePage/>
       <DonationScreen/>
      </div>
    </>
  );
}