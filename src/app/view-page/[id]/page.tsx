
'use client'

import { Button } from "@/components/ui/button";
import * as React from "react";
import { Navigation } from "../../(web)/_Components/Navigation";
import ProfileScreen from "./_components/profileSection";
import DonationScreen from "./_components/donationSection";
import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";


export default function Page() {
  const router = useRouter()
  const {id} =  useParams();
  console.log(id)
  const [image, setImage] = useState<string|null>(null);
   
  const handleImageChange= (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL); 
    } else {
      setImage(null); 
    }
  };

  return (
    <>
      <Navigation />
      <div className="w-screen h-[319px] bg-[#F4F4F5] flex justify-center items-center relative">
        {!image?(
          <>
            <input
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              type="file"
            />
            <Button>Add a cover image</Button>
          </>   
        ):(
          <img
            src={image}
            className="bg-cover object-cover rounded-md w-full h-full" 
          />
        )}
      </div>

      <div className="w-full flex gap-8 justify-center absolute mt-[-3%]">
        <ProfileScreen />
        <DonationScreen />
      </div>
    </>
  );
}
