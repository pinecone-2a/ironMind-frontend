"use client";

import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserInfo } from "./page"; 

type ProfileStepProps = {
  userInfo: UserInfo;
  error: {
    avatarImage: string;
    name: string;
    about: string;
    socialMediaURL: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
}


export const CreateProfileStep1: React.FC<ProfileStepProps> = ({ userInfo, error, onChange, handleNext }) => {


  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
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
       
        console.log(dataJson.secure_url);
  
        onChange({
          target: { id: "avatarImage", value: dataJson.secure_url },
        } as ChangeEvent<HTMLInputElement>);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };
  
  
  
  
  
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <div className="h-fit w-[510px] flex flex-col">
        <h1 className="font-bold text-[24px] text-left mb-[26px]">Complete your profile page</h1>


        <label className="mt-8 text-[14px] font-[500]">Add photo</label>
        <label
          className="rounded-full border-[2px] border-gray-400 border-dashed h-[160px] w-[160px] mb-[24px]"
          htmlFor="avatar"
          style={
            userInfo.avatarImage
              ? {
                  backgroundImage: `url(${userInfo.avatarImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }
        ></label>
        {error.avatarImage && <p className="text-[#EF4444] font-[400] text-xs mb-[18px]">{error.avatarImage}</p>}

        <input id="avatar" onChange={handleChange} type="file" accept="image/*" className="hidden" />


        <label htmlFor="name">Name</label>
        <Input
          placeholder="Enter your name here"
          className="h-[40px] w-[510px] rounded-md py-[8px] px-[12px]"
          id="name"
          value={userInfo.name}
          onChange={onChange} 
        />
        {error.name && <p className="text-[#EF4444] font-[400] text-xs">{error.name}</p>}

     
        <label className="text-[14px] mt-[12px]" htmlFor="about">
          About
        </label>
        <Input
          className="h-[131px] max-w-[510px] text-start flex overflow-hidden truncate "
          placeholder="Write about yourself here"
          id="about"
          value={userInfo.about}
          onChange={onChange}
        />
        {error.about && <p className="text-[#EF4444] font-[400] text-xs">{error.about}</p>}


        <label className="text-[14px] mt-[12px]" htmlFor="socialMediaURL">
          Social media URL
        </label>
        <Input
          placeholder="https://"
          className="mb-[24px]"
          id="socialMediaURL"
          value={userInfo.socialMediaURL}
          onChange={onChange}
        />
        {error.socialMediaURL && <p className="text-[#EF4444] font-[400] text-xs">{error.socialMediaURL}</p>}

   
        <div className="flex justify-end">
          <Button onClick={handleNext} className="items-left w-[246px] h-[40px]">Continue</Button>
        </div>
      </div>
    </div>
  );
};