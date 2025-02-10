"use client";

import { Button } from "@/components/ui/button";
import { CreateProfileStep1 } from "./stepOne";
import { CreateProfileStep2 } from "./stepTwo";
import { useState, ChangeEvent, useEffect } from "react";
import Success from "./success";
import { onPost } from "../_Components/hooks/useFetch";
import { useSearchParams } from "next/navigation";

export type UserInfo = {
  avatarImage: string;
  name: string;
  about: string;
  socialMediaURL: string;
  userId: string;
  backgroundImage: string;
  successMessage: string;

};

export type userCardInfo = {
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
  year: string;
  cvc: string;
  userId: string;
};


type profilError = {
  avatarImage: string;
  name: string;
  about: string;
  socialMediaURL: string;
};

type cardError = {
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
  year: string;
  cvc: string;
}

export default function CreateProfile() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const searchParams = useSearchParams();
  const Id = searchParams.get("username");
  const [userInfo, setUserInfo] = useState<UserInfo>({
    avatarImage: "",
    name: "",
    about: "",
    socialMediaURL: "",
    userId: Id || "",
    backgroundImage: "",
    successMessage: "",
  });

  const [userCardInfo, setUserCardInfo] = useState<userCardInfo>({
    country: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiryDate: "",
    year: "2025",
    cvc: "",
    userId: Id || ""
  })

  const [error, setError] = useState<profilError>({
    avatarImage: "",
    name: "",
    about: "",
    socialMediaURL: "",
  });

  const [cardError, setCardError] = useState<cardError>({
    country: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiryDate: "",
    year: "",
    cvc: "",
  });

  // useEffect(() => {
  //   if (!userName) return; 
  
  //   const fetchUserId = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:5000/user/getId?username=${encodeURIComponent(userName)}`);
  //       if (!response.ok) {
  //         throw new Error(`Error fetching user ID: ${response.statusText}`);
  //       }
  //       const data = await response.json();
  
  //       if (data && data.id) {
  //         setId(data.id);
  //         console.log("User ID:", data.id);
  //       } else {
  //         console.log("User not found or invalid response");
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch user ID:", error);
  //     }
  //   };
  
  //   fetchUserId();
  // }, [userName]);
  



  

  useEffect(() => {
    console.log("Updated User ID:", Id);
  }, [Id]);
  



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
      avatarImage: userInfo.avatarImage ? "" : "Please enter image",
      name: userInfo.name ? "" : "Please enter name",
      about: userInfo.about ? "" : "Please enter info about yourself",
      socialMediaURL: userInfo.socialMediaURL ? "" : "Please enter a social link",
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
      expiryDate: monthRegex.test(userCardInfo.expiryDate) ? "" : "Invalid month",
      year: yearRegex.test(userCardInfo.year) ? "" : "Invalid month",
      cvc: cvcRegex.test(userCardInfo.cvc) ? "" : "Invalid month",
    };
  
    setCardError(newErrors);
    return Object.values(newErrors).every((err) => err === ""); 
  };
  

  const handleNext = () => {
    console.log("Checking")
    if (profileValidate()) {
      console.log(userInfo);
      onPost("profile/", userInfo)
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Validation failed, staying on the same step.");
      console.log(userInfo)
    }
  };
  

  const handleSubmit = () => {
    if (cardValidate()) {
      setCurrentStep((prev) => prev + 1);
      onPost("bankcard/", userCardInfo)
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