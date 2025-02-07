"use client";

import { Button } from "@/components/ui/button";
import { CreateProfileStep1 } from "./stepOne";
import { CreateProfileStep2 } from "./stepTwo";
import { useState, ChangeEvent } from "react";
import Success from "./success";

export type UserInfo = {
  image: string;
  name: string;
  about: string;
  socialURL: string;

};

export type userCardInfo = {
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expires: string;
  year: string;
  cvc: string;
};


type profilError = {
  image: string;
  name: string;
  about: string;
  socialURL: string;
};

type cardError = {
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expires: string;
  year: string;
  cvc: string;
}

export default function CreateProfile() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    image: "",
    name: "",
    about: "",
    socialURL: "",
  });

  const [userCardInfo, setUserCardInfo] = useState<userCardInfo>({
    country: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expires: "",
    year: "2025",
    cvc: "",
  })

  const [error, setError] = useState<profilError>({
    image: "",
    name: "",
    about: "",
    socialURL: "",
  });

  const [cardError, setCardError] = useState<cardError>({
    country: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expires: "",
    year: "",
    cvc: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [id]: value,
    }));

    setError((prev) => ({
      ...prev,
      [id]: "",
    }));
  };


  const onChangeStep2 = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
  
    console.log(`Updating ${id} with value:`, value); 
  
    setUserCardInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  
    setCardError((prev) => ({
      ...prev,
      [id]: "", 
    }));
  };
  

  const profileValidate = () => {
    const newErrors: profilError = {
      image: userInfo.image ? "" : "Please enter image",
      name: userInfo.name ? "" : "Please enter name",
      about: userInfo.about ? "" : "Please enter info about yourself",
      socialURL: userInfo.socialURL ? "" : "Please enter a social link",
    };

    setError(newErrors);
    return Object.values(newErrors).every((err) => err === ""); 
  };


  const cardValidate = () => {
    const cardNumberRegex = /^[0-9]{16}$/;
    const monthRegex = /^(0[1-9]|1[0-2])$/;
    const yearRegex = /^(20[2-9][0-9])$/;
    const cvcRegex = /^[0-9]{3,4}$/; 
    const nameRegex = /^[a-zA-Z\s]+$/; 
  
    const newErrors: cardError = {
      country: userCardInfo.country ? "" : "Select country to continue",
      firstName: nameRegex.test(userCardInfo.firstName) ? "" : "First name must match",
      lastName: nameRegex.test(userCardInfo.lastName) ? "" : "Last name must match",
      cardNumber: cardNumberRegex.test(userCardInfo.cardNumber) ? "" : "Invalid card number",
      expires: monthRegex.test(userCardInfo.expires) ? "" : "Invalid month",
      year: yearRegex.test(userCardInfo.year) ? "" : "Invalid month",
      cvc: cvcRegex.test(userCardInfo.cvc) ? "" : "Invalid month",
    };
  
    setCardError(newErrors);
    return Object.values(newErrors).every((err) => err === ""); 
  };
  

  const handleNext = () => {
    console.log("Checking")
    if (profileValidate()) {
      console.log("Validation passed, moving to the next step.");
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Validation failed, staying on the same step.");
      console.log(userInfo)
    }
  };
  

  const handleSubmit = () => {
    if (cardValidate()) {
      setCurrentStep((prev) => prev + 1);
      console.log("Submit Data:", userCardInfo);
    }
  };

  return (
    <> 
      {currentStep === 1 && <CreateProfileStep1 userInfo={userInfo} error={error} onChange={onChange}  handleNext={handleNext}/>}
      {currentStep === 2 && <CreateProfileStep2 userCardInfo={userCardInfo} cardError={cardError} onChangeStep2={onChangeStep2} handleSubmit={handleSubmit} />}
      {currentStep === 3 && <Success />}
      </>
  );
}
