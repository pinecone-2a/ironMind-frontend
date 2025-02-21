"use client";
import { useContext } from "react";
import { UserProvider } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Navigation } from "../(web)/_Components/Navigation";
import ProfileScreen from "./_components/profileSection";
import DonationScreen from "./_components/donationSection";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Profile } from "./_components/profileSection";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [image, setImage] = useState<string | null>(null);

  // Upload the image to Cloudinary
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Food_delivery");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/df88yvhqr/upload`,
          { method: "POST", body: data }
        );

        if (!response.ok) throw new Error("Image upload failed");

        const dataJson = await response.json();
        setImage(dataJson.secure_url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (id) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id}`
          );
          const data = await res.json();
          console.log(data);
          setProfile(data.profile);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navigation />
      <div className="w-screen h-[319px] bg-[#F4F4F5] flex justify-center items-center relative">
        {profile.userId === id && !profile.backgroundImage ? (
          <>
            <input
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              type="file"
              id="image"
            />
            <label
              htmlFor="image"
              className="bg-[#18181B] w-[181px] h-[40px] rounded-md text-white flex justify-center items-center"
            >
              Add cover image
            </label>
          </>
        ) : (
          <img
            src={
              image ||
              profile.backgroundImage ||
              "https://via.placeholder.com/150"
            }
            className="bg-cover object-cover rounded-md w-full h-full"
          />
        )}
      </div>

      <div className="flex justify-center">
        <div className="absolute mt-[-3%] flex justify-center gap-8">
          <ProfileScreen />
          <DonationScreen />
        </div>
      </div>
    </>
  );
}
