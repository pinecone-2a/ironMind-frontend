"use client"
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

export const CreateProfileStep2 = () => {
  const [cardInfo, setCardInfo] = useState("")


  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <div className="h-fit w-[510px] max-w-[672px] flex flex-col items-start gap-3">
        <h1 className="self-stretch text-[24px] font-bold">
          How would you like to be paid?
        </h1>
        <p className='text-[#71717A]'>Enter location and payment details</p>

        <label htmlFor="country">Select country</label>
        <Input id="country" className="w-[510px] h-[40px]" />

            <div className="flex w-full gap-3">
      <div className="flex flex-col w-1/2">
        <label htmlFor="firstName">First name</label>
        <Input id="firstName" className="h-[40px] w-full" />
      </div>
      
          <div className="flex flex-col w-1/2">
            <label htmlFor="lastName">Last name</label>
            <Input id="lastName" className="h-[40px] w-full" />
          </div>
        </div>
            <label htmlFor="cardNumber">Enter card number</label>
          <Input id='cardNumber' className="h-[40px] w-[510px]" />
       
          <div className="flex w-full gap-3">
        <div className="flex flex-col w-1/3">
          <label htmlFor="expires">Expires</label>
          <Input id='expires' className="h-[40px] w-full" />
        </div>
        <div className="flex flex-col w-1/3">
        <label htmlFor="year">Year</label>
          <Input id='year' type='number' min="1900" max="2099" step="1" value="2025" className="h-[40px] w-full" />
        </div>
        <div className="flex flex-col w-1/3">
        <label htmlFor="cvc">CVC</label>
          <Input id='cvc'  className="h-[40px] w-full" />
        </div>
      </div>



      </div>
    </div>
  );
};