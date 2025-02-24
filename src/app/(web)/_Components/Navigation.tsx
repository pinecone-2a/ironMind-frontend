"use client";

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
import useUserId from "@/app/_Components/hooks/useFetchUserId";
import { HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import cookies from "js-cookie";
import Link from "next/link";

export const Navigation = () => {
  const router = useRouter();
  const [profileName, setProfileName] = useState("");
  const [profile, setProfile] = useState("");

  const { userId } = useUserId();

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/avatarImage/${userId}`
          );
          const data = await res.json();
          setProfile(data.avatarImage);
          setProfileName(data.name);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
    };
    fetchProfile();
  }, [userId]);
  console.log(profile);

  async function logout() {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      router.push("/log-in");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-between h-full px-24 py-8">
      <Link href="/">
        <div className="flex gap-2 text-black text-xl font-extrabold">
          <Coffee />
          <h1>Buy Me Coffee</h1>
        </div>
      </Link>
      <div className="flex gap-10">
        <button className="flex justify-between items-center">
          <Avatar>
            <AvatarImage src={profile || "/default-avatar.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="px-2 font-semibold">{profileName}</div>
          <div className="grid">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="px-20">
                  <ChevronDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="grid gap-y-1">
                <DropdownMenuItem className="flex justify-between">
                  Help <HelpCircle />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={logout}
                  className="flex justify-between"
                >
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
