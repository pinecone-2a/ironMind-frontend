"use client";
import * as React from "react";
import { Navigation } from "@/app/(web)/_Components/Navigation";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import ProfilePage from "./profile";
import DonationScreen from "./donation";
import cookies from "js-cookie";

export default function Page() {
  interface Profile {
    id: string;
    name: string;
    about: string;
    avatarImage: string;
    socialMediaURL: string;
    backgroundImage?: string | null;
    userId?: string;
  }
  const [donorId, setDonorId] = useState<any>();
  const router = useParams();
  const { id } = router;

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
      } catch (error) {}
    }
    fetchUser();
  }, []);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (id) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${id}`
          );
          const data = await res.json();
          console.log(data);
          setProfile(data);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
    };
    fetchProfile();
  }, [id]);
  console.log(profile);

  return (
    <>
      <div className="w-screen h-[319px] bg-[#F4F4F5] flex justify-center items-center relative">
        <img
          src={profile?.backgroundImage || "https://via.placeholder.com/150"}
          className="bg-cover object-cover rounded-md w-full h-full"
        />
      </div>

      <div className="flex justify-center">
        <div className="absolute mt-[-3%] flex justify-center gap-8">
          <ProfilePage />
          <DonationScreen />
        </div>
      </div>
    </>
  );
}
