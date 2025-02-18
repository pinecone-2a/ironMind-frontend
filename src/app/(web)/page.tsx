"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import cookies from "js-cookie";

import { useCookies } from "next-client-cookies";
import { onPost } from "../_Components/hooks/useFetch";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Copy, User } from "lucide-react";


type User = {
  username: string;
  email: string;
  id: string;
  user: string;
};


type Transaction = {
  name: string;
  profileUrl: string;
  specialMessage?: string;
  amount: number;
  createdat: string;
};


function ShareLink(setCopied: any) {
  const pageUrl = "https://www.instagram.com/";
 
  navigator.clipboard
    .writeText(pageUrl)
    .then(() => {
      setCopied(true);
 
      setTimeout(() => setCopied(false), 1000);
    })
    .catch((err) => {
      alert("Failed to copy the link.");
 
      console.error("Error", err);
    });
}
 
export default function Dashboard() {
  // const cookies = useCookies()
  const [user, setUser] = useState<any>();
  const [donation, setDonation] = useState<any>([])
const [copied, setCopied] = useState(false)
  const [totalEarning, setTotalEarning] = useState<number>()
  const [filterAmount, setFilterAmount] = useState<number | null>(null);
  const router = useRouter();

  const transactions: Transaction[] = [

  ];


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
        setUser(data.user.userId.id);

        router.push("/");
      } catch (error) {
        console.error("Authentication error:", error);
        router.push("/log-in");
      }
    }

    fetchUser();
  }, []);


  useEffect(() => {
    if (!user) return;
  
    async function fetchUserData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/donation/received/${user}`);
        const totalEarning = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/donation/total-earnings/${user}`);
        

        const totalEarningResult = await totalEarning.json()
        const result = await response.json();
        transactions.push(result);
        console.log(totalEarning)
        setTotalEarning(totalEarningResult.earnings)
        setDonation(result);
        console.log(totalEarningResult)
        console.log("Received donations:", transactions[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }


    fetchUserData();
  }, [user]);

  const filteredDonations = filterAmount
    ? donation.filter((t: { amount: number }) => t.amount === filterAmount)

    : donation;

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-2xl mx-auto">

      <h1 className="text-black text-[20px]">{user}</h1>
        <Card className="p-6 rounded-lg shadow-lg">
          <div className="mt-4 flex justify-between items-center">
            <div>
              <Avatar>
                <h1 className="text-black text-[20px]">{user.id}</h1>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold"></h2>
              <p className="text-gray-400"></p>
            </div>
            {/* <div>
            <Button onClick={() => ShareLink(setCopied)} className="flex gap-4">
              <Copy />
              Share page link
            </Button>
            {copied && (
              <p className="text-green-500 mt-2 text-sm text-center">✅ Link copied!</p>
            )}</div> */}

          </div>
          <div className="mt-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Earnings</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex gap-4">
                  Last 30 days
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                <DropdownMenuItem>Last 60 days</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-4xl font-bold mt-2">${totalEarning}</p>
        </Card>
        <Card className="p-6 mt-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recent transactions</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex gap-4 bg-white text-black hover:bg-white border border-dashed">

                  Amount
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {[1, 2, 5, 10].map((amount) => (
                  <DropdownMenuItem key={amount}>
                    <Checkbox
                      checked={filterAmount === amount}
                      onCheckedChange={() =>
                        setFilterAmount(filterAmount === amount ? null : amount)
                      }
                    />
                    <span className="ml -2">${amount}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-4 space-y-4">

            {filteredDonations?.length > 0 &&
              filteredDonations.map((transaction: any, index: any) => (
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
                      <p className="text-gray-300 mt-1 text-sm text-bold ">
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
              ))}

          </div>
        </Card>
      </div>
    </div>
  );
}
