"use client";
import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProfileStepProps {
  userCardInfo: {
    country: string;
    firstName: string;
    lastName: string;
    cardNumber: string;
    expires: string;
    year: string;
    cvc: string;
  };
  cardError: {
    country: string;
    firstName: string;
    lastName: string;
    cardNumber: string;
    expires: string;
    year: string;
    cvc: string;
  };
  onChangeStep2: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const CreateProfileStep2: React.FC<ProfileStepProps> = ({ userCardInfo, cardError, onChangeStep2, handleSubmit }) => {
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <div className="h-fit w-[510px] max-w-[672px] flex flex-col items-start gap-3">
        <h1 className="self-stretch text-[24px] font-bold">How would you like to be paid?</h1>
        <p className="text-[#71717A]">Enter location and payment details</p>

    
        <label htmlFor="country">Select country</label>
        <Input id="country" className="w-[510px] h-[40px]" value={userCardInfo.country} onChange={onChangeStep2} />
        {cardError.country && <p className="text-red-500 text-xs">{cardError.country}</p>}

    
        <div className="flex w-full gap-3">
          <div className="flex flex-col w-1/2">
            <label htmlFor="firstName">First name</label>
            <Input id="firstName" className="h-[40px] w-full" value={userCardInfo.firstName} onChange={onChangeStep2} />
            {cardError.firstName && <p className="text-red-500 text-xs">{cardError.firstName}</p>}
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="lastName">Last name</label>
            <Input id="lastName" className="h-[40px] w-full" value={userCardInfo.lastName} onChange={onChangeStep2} />
            {cardError.lastName && <p className="text-red-500 text-xs">{cardError.lastName}</p>}
          </div>
        </div>


        <label htmlFor="cardNumber">Enter card number</label>
        <Input type="number" id="cardNumber" className="h-[40px] w-[510px]" value={userCardInfo.cardNumber} onChange={onChangeStep2} />
        {cardError.cardNumber && <p className="text-red-500 text-xs">{cardError.cardNumber}</p>}

        <div className="flex w-full gap-3">
          <div className="flex flex-col w-1/3">
            <label htmlFor="expires">Expires</label>
            <Input id="expires" className="h-[40px] w-full" value={userCardInfo.expires} onChange={onChangeStep2} />
            {cardError.expires && <p className="text-red-500 text-xs">{cardError.expires}</p>}
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="year">Year</label>
            <Input
              id="year"
              type="number"
              min="2024"
              max="2099"
              step="1"
              value={userCardInfo.year}
              onChange={onChangeStep2}
              className="h-[40px] w-full"
            />
            {cardError.year && <p className="text-red-500 text-xs">{cardError.year}</p>}
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="cvc">CVC</label>
            <Input id="cvc" type='number' className="h-[40px] w-full" value={userCardInfo.cvc} onChange={onChangeStep2} />
            {cardError.cvc && <p className="text-red-500 text-xs">{cardError.cvc}</p>}
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} className="items-left w-[246px] h-[40px]">Continue</Button>
        </div>

      </div>
    </div>
  );
};
