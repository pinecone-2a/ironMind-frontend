"use client";

import { Button } from "@/components/ui/button";
import { CreateProfileStep1 } from "./stepOne";
import { CreateProfileStep2 } from "./stepTwo";
import { useState, ChangeEvent } from "react";


export type UserInfo = {
  image: string;
  name: string;
  about: string;
  socialURL: string;
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expires: string;
  year: string;
  cvc: string;
};


type ErrorInfo = {
  image: string;
  name: string;
  about: string;
  socialURL: string;
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expires: string;
  year: string;
  cvc: string;
};

export default function CreateProfile() {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    image: "",
    name: "",
    about: "",
    socialURL: "",
    country: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expires: "",
    year: "2025",
    cvc: "",
  });

  const [error, setError] = useState<ErrorInfo>({
    image: "",
    name: "",
    about: "",
    socialURL: "",
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

  const validateFields = () => {
    const newErrors: ErrorInfo = {
      image: userInfo.image ? "" : "Please enter image",
      name: userInfo.name ? "" : "Please enter name",
      about: userInfo.about ? "" : "Please enter info about yourself",
      socialURL: userInfo.socialURL ? "" : "Please enter a social link",
      country: userInfo.country ? "" : "Select country to continue",
      firstName: userInfo.firstName ? "" : "First name must match",
      lastName: userInfo.lastName ? "" : "Last name must match",
      cardNumber: userInfo.cardNumber ? "" : "Invalid card number",
      expires: userInfo.expires ? "" : "Invalid month",
      year: userInfo.year ? "" : "Invalid month",
      cvc: userInfo.cvc ? "" : "Invalid month",
    };

    setError(newErrors);
    return Object.values(newErrors).every((err) => err === ""); 
  };

  const handleNext = () => {
    if (validateFields()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (validateFields()) {
      console.log("Submit Data:", userInfo);
    }
  };

  return (
    <> 
      {currentStep === 1 && <CreateProfileStep1 userInfo={userInfo} error={error} onChange={onChange}  handleNext={handleNext}/>}
      {currentStep === 2 && <CreateProfileStep2 userInfo={userInfo} error={error} onChange={onChange} handleSubmit={handleSubmit} />}

     </>
  );
}
