"use client";
import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProfileStepProps {
  userInfo: {
    country: string;
    firstName: string;
    lastName: string;
    cardNumber: string;
    expires: string;
    year: string;
    cvc: string;
  };
  error: {
    country: string;
    firstName: string;
    lastName: string;
    cardNumber: string;
    expires: string;
    year: string;
    cvc: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const CreateProfileStep2: React.FC<ProfileStepProps> = ({ userInfo, error, onChange, handleSubmit }) => {
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <div className="h-fit w-[510px] max-w-[672px] flex flex-col items-start gap-3">
        <h1 className="self-stretch text-[24px] font-bold">How would you like to be paid?</h1>
        <p className="text-[#71717A]">Enter location and payment details</p>

    
        <label htmlFor="country">Select country</label>
        <Input id="country" className="w-[510px] h-[40px]" value={userInfo.country} onChange={onChange} />
        {error.country && <p className="text-red-500 text-xs">{error.country}</p>}

    
        <div className="flex w-full gap-3">
          <div className="flex flex-col w-1/2">
            <label htmlFor="firstName">First name</label>
            <Input id="firstName" className="h-[40px] w-full" value={userInfo.firstName} onChange={onChange} />
            {error.firstName && <p className="text-red-500 text-xs">{error.firstName}</p>}
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="lastName">Last name</label>
            <Input id="lastName" className="h-[40px] w-full" value={userInfo.lastName} onChange={onChange} />
            {error.lastName && <p className="text-red-500 text-xs">{error.lastName}</p>}
          </div>
        </div>


        <label htmlFor="cardNumber">Enter card number</label>
        <Input type="number" id="cardNumber" className="h-[40px] w-[510px]" value={userInfo.cardNumber} onChange={onChange} />
        {error.cardNumber && <p className="text-red-500 text-xs">{error.cardNumber}</p>}

        <div className="flex w-full gap-3">
          <div className="flex flex-col w-1/3">
            <label htmlFor="expires">Expires</label>
            <Input id="expires" className="h-[40px] w-full" value={userInfo.expires} onChange={onChange} />
            {error.expires && <p className="text-red-500 text-xs">{error.expires}</p>}
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="year">Year</label>
            <Input
              id="year"
              type="number"
              min="2024"
              max="2099"
              step="1"
              value={userInfo.year}
              onChange={onChange}
              className="h-[40px] w-full"
            />
            {error.year && <p className="text-red-500 text-xs">{error.year}</p>}
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="cvc">CVC</label>
            <Input id="cvc" type='number' className="h-[40px] w-full" value={userInfo.cvc} onChange={onChange} />
            {error.cvc && <p className="text-red-500 text-xs">{error.cvc}</p>}
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} className="items-left w-[246px] h-[40px]">Continue</Button>
        </div>

      </div>
    </div>
  );
};
