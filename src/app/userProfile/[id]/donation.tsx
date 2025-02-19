"use client";

import { VscCoffee } from "react-icons/vsc";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import cookies from "js-cookie";

export type Donation = {
  amount: number;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  donorId: string;
  recipentId: string;
};

export default function DonationScreen() {
  const [donorId, setDonorId] = useState<any>("")
  const params = useParams();
  const recipentId = params.id as string; 



  const [donation, setDonation] = useState<Donation>({
    amount: 2,
    specialMessage: "",
    socialURLOrBuyMeACoffee: "",
    donorId: donorId,
    recipentId: "ONxm4AVVmrfZa5Xptw130",
  });


  useEffect(() => {
    console.log(recipentId)
    if (recipentId) {
        setDonation((prev) => ({ ...prev, recipentId }));
    }
  }, [recipentId]);

  useEffect(() => {
    if (donorId) {
      setDonation((prev) => ({ ...prev, donorId }));
    }
  }, [donorId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setDonation((prev) => ({
      ...prev,
      [id]: value,
    }));
    console.log(donation)
  };

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
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    }
    fetchUser();
  }, []);

  const sendDonation = async (postPath: string, body: Donation) => {
    console.log(body)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${postPath}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      console.log("Donation successful:", data);
    } catch (error) {
      console.error("Error sending donation:", error);
    }
  };

  const handleDonation = () => {
    sendDonation("donation/create-donation", donation);
  };

  return (
    <div className="w-[628px] rounded-md border p-5 bg-white">
      <p className="text-[24px] font-semibold">Buy them a coffee</p>

      <p className="text-[14px] mt-6 mb-2">Select amount:</p>
      <div className="flex gap-3 text-[14px]">
        {[1, 2, 5, 10].map((amount) => (
          <button
            key={amount}
            onClick={() =>
                setDonation((prev) => ({ ...prev, amount }))
            }
            className={`rounded-lg bg-[#F4F4F5] py-3 px-4 flex items-center gap-2 hover:border-black border-2 ${
              donation.amount === amount ? "border-black" : "border-white"
            }`}
          >
            <VscCoffee />
            <p>${amount}</p>
          </button>
        ))}
      </div>

      <p className="text-[14px] mt-6 mb-2">Enter BuyMeCoffee or social account URL:</p>
      <input
        id="socialURLOrBuyMeACoffee"
        onChange={handleChange}
        placeholder="buymeacoffee.com/"
        className="border rounded-md px-3 py-2 w-[100%] text-[14px]"
      />

      <p className="text-[14px] mt-6 mb-2">Special message:</p>
      <textarea
        id="specialMessage"
        onChange={handleChange}
        placeholder="Please write your message here"
        className="border rounded-md px-3 py-2 w-[100%] text-[14px]"
      />

      <button
        onClick={handleDonation}
        className="py-2 bg-[#18181B] flex justify-center items-center w-[100%] text-white mt-8 rounded-md hover:bg-[#616164] text-[14px]"
      >
        Support
      </button>
    </div>
  );
}
