"use client";

import React, { useEffect, useState } from "react";
import useFetchUserData from "../_Components/hooks/useFetchUserData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCookies } from "next-client-cookies";
import useUserId from "../_Components/hooks/useFetchUserId";
import { useUser } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Copy } from "lucide-react";

type Transaction = {
  name: string;
  profileUrl: string;
  specialMessage?: string;
  amount: number;
  createdAt: string;
};

export default function Dashboard() {
  const [donation, setDonation] = useState<Transaction[]>([]);
  const [copied, setCopied] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [totalEarning, setTotalEarning] = useState<number>(0);
  const [filterAmount, setFilterAmount] = useState<number | null>(null);
  const { userId } = useUserId();
  const { userData, loading } = useFetchUserData(
    `/donation/total-earnings/${userId}`
  );
  console.log(userData);

  useEffect(() => {
    if (!userId) return;

    async function fetchUserData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/donation/received/${userId}`
        );
        const totalEarningsRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/donation/total-earnings/${userId}`
        );
        const profileImage = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/avatarImage/${userId}`
        );

        const totalEarningsData = await totalEarningsRes.json();
        const donationData = await response.json();
        const profileData = await profileImage.json();

        setAvatar(profileData.avatarImage);
        setTotalEarning(totalEarningsData.earnings);
        setDonation(donationData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [userId]);

  const filteredDonations = filterAmount
    ? donation.filter((t) => t.amount === filterAmount)
    : donation;

  if (!userId) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-black text-[20px]">{userId} </h1>
        <Card className="p-6 rounded-lg shadow-lg">
          <div className="mt-4 flex justify-between items-center">
            <Avatar>
              <AvatarImage src={avatar} />
              <AvatarFallback>{userId.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold">Total Earnings</h2>
          </div>
          <p className="text-4xl font-bold mt-2">${totalEarning}</p>
        </Card>

        <Card className="p-6 mt-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Recent transactions</h3>
          <div className="mt-4 space-y-4">
            {filteredDonations.length > 0 ? (
              filteredDonations.map((transaction, index) => (
                <Card
                  key={index}
                  className="p-4 rounded-lg flex justify-between items-start"
                >
                  <div>
                    <p className="font-semibold text-black">
                      {transaction.name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {transaction.profileUrl}
                    </p>
                    {transaction.specialMessage && (
                      <p className="text-gray-300 mt-1 text-sm">
                        {transaction.specialMessage}
                      </p>
                    )}
                    <p className="text-gray-400 text-xs mt-1">
                      {transaction.createdAt}
                    </p>
                  </div>
                  <p className="font-semibold text-green-400">
                    + ${transaction.amount}
                  </p>
                </Card>
              ))
            ) : (
              <p className="text-gray-400">No donations yet.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
