"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import cookies from "js-cookie";
import { useCookies } from "next-client-cookies";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Copy } from "lucide-react";

interface User {
  username: string;
  email: string;
}

interface Transaction {
  name: string;
  profileUrl: string;
  message?: string;
  amount: number;
  timeAgo: string;
}

const transactions: Transaction[] = [
  {
    name: "Azaa",
    profileUrl: "buymeacoffee.com/kissyface",
    amount: 2,
    timeAgo: "10 mins ago",
  },
  {
    name: "baagii",
    profileUrl: "instagram.com/weleisley",
    message: "Thank you!",
    amount: 1,
    timeAgo: "5 hours ago",
  },
  {
    name: "amaraa",
    profileUrl: "buymeacoffee.com/bdsadas",
    message: "Thank you!",
    amount: 10,
    timeAgo: "10 hours ago",
  },
];

export default function Dashboard() {
  // const cookies = useCookies()
  const [user, setUser] = useState<User | null>(null);
  const [earnings, setEarnings] = useState(450);
  const [filterAmount, setFilterAmount] = useState<number | null>(null);
  const router = useRouter();

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

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        console.log(data);
        setUser(data.user);

        router.push("/");
      } catch (error) {
        router.push("/log-in"); // Redirect to login if unauthorized
      }
    }

    fetchUser();
  }, []);

  const filteredTransactions = filterAmount
    ? transactions.filter((t) => t.amount === filterAmount)
    : transactions;

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-black text-[20px]">{user.email}</h1>
        <Card className="p-6 rounded-lg shadow-lg">
          <div className="mt-4 flex justify-between items-center">
            <div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold"></h2>
              <p className="text-gray-400"></p>
            </div>
            <Button className="flex gap-4">
              <Copy />
              Share page link
            </Button>
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
          <p className="text-4xl font-bold mt-2">${earnings}</p>
        </Card>
        <Card className="p-6 mt-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recent transactions</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex gap-4">
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
                    <span className="ml-2">${amount}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-4 space-y-4">
            {filteredTransactions.map((transaction, index) => (
              <Card
                key={index}
                className="p-4 rounded-lg flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold text-black">{transaction.name}</p>
                  <p className="text-gray-400 text-sm">
                    {transaction.profileUrl}
                  </p>
                  {transaction.message && (
                    <p className="text-gray-300 mt-1 text-sm">
                      {transaction.message}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    {transaction.timeAgo}
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
