
'use client'

import { Button } from "@/components/ui/button";
import * as React from "react";
import { Navigation } from "../../(web)/_Components/Navigation";
import ProfileScreen from "./_components/profileSection";
import DonationScreen from "./_components/donationSection";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Profile } from "./_components/profileSection";


export default function Page() {
  const router = useRouter()
  const {id} =  useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
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

    useEffect(() => {
      const fetchProfile = async () => {
        if (id) {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id}`);
            const data = await res.json();
            console.log(data)
            setProfile(data.profile);
          } catch (error) {
            console.error('Failed to fetch profile:', error);
          } 
        }
      }
  
      fetchProfile();
    }, [id]);
    
    if (!profile) {
      return <div>Loading...</div>;
    }
  return (
    <>
      <Navigation />
      <div className="w-screen h-[319px] bg-[#F4F4F5] flex justify-center items-center relative">
        {profile.id === id && !image ? (
          <>

            <input
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              type="file"
            />
            <Button>Add a cover image</Button>
          </>
        ) : (
          <img
            src={image || profile.backgroundImage || 'https://via.placeholder.com/150'}
            className="bg-cover object-cover rounded-md w-full h-full"
            alt="Cover Image"
          />
        )}
      </div>
      <Button className="absolute top-20">Change cover</Button>
      <div className="flex justify-center">
        <div className="absolute mt-[-3%] flex justify-center gap-8">
         <ProfileScreen />
         <DonationScreen />
        </div>
      </div>
    </>
  );
}
