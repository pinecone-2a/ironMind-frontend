
'use client'
import * as React from "react";
import { Navigation } from "../../_Components/Navigation";
import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import ProfilePage from "./profile";
import DonationScreen from "./donation";



export default function Page() {
  return (
    <>

      <div className="w-full flex gap-8 absolute ">
       <ProfilePage/>
       <DonationScreen/>
      </div>
    </>
  );
}