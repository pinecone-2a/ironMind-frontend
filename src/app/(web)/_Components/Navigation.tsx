"use client"

import { Coffee } from "lucide-react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { Settings } from "lucide-react";
import { HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
export const Navigation = () => {
  const router = useRouter()
 

 async function logout() {  
  router.push("log-in") 
  try {
    await fetch("http://localhost:5000/user/logout/", {
      method: "POST",
      credentials: "include"
    })
   
  }
  catch(error) {
    console.log(error)

  }
}

  return (
    <div className="flex justify-between h-full px-24 py-8">
      <div className="flex gap-2 text-black text-xl font-extrabold ">
        <Coffee />
        <h1>Buy Me Coffee</h1>
      </div>
      <div className="flex gap-10 ">
        <button className="flex justify-between items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="px-2 font-semibold">Jake</div>
          <div className="grid">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="px-20 ">
                  <ChevronDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" grid gap-y-1">
                <DropdownMenuItem className="flex justify-between">
                  Help <HelpCircle />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="flex justify-between">
                  Log out <LogOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </button>
      </div>
    </div>
  );
};
