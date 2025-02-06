"use client";

import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserInfo } from "./page"; 

type ProfileStepProps = {
  userInfo: UserInfo;
  error: {
    image: string;
    name: string;
    about: string;
    socialURL: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
}


export const CreateProfileStep1: React.FC<ProfileStepProps> = ({ userInfo, error, onChange, handleNext, }) => {
  const [image, setImage] = useState<string | null>();


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      error.image = ""
      setImage(URL.createObjectURL(event.target.files[0]));
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
            image
              ? {
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }
        ></label>
        {error.image && <p className="text-[#EF4444] font-[400] text-xs mb-[18px]">{error.image}</p>}

        <input id="avatar"  onChange={handleChange} type="file" accept="image/*" className="hidden" />


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
          className="h-[131px] w-[510px]"
          placeholder="Write about yourself here"
          id="about"
          value={userInfo.about}
          onChange={onChange}
        />
        {error.about && <p className="text-[#EF4444] font-[400] text-xs">{error.about}</p>}


        <label className="text-[14px] mt-[12px]" htmlFor="socialURL">
          Social media URL
        </label>
        <Input
          placeholder="https://"
          className="mb-[24px]"
          id="socialURL"
          value={userInfo.socialURL}
          onChange={onChange}
        />
        {error.socialURL && <p className="text-[#EF4444] font-[400] text-xs">{error.socialURL}</p>}

   
        <div className="flex justify-end">
          <Button onClick={handleNext} className="items-left w-[246px] h-[40px]">Continue</Button>
        </div>
      </div>
    </div>
  );
};
