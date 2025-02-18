"use client";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";


export const SideBar = () => {
  const pathname = usePathname();
  const splitedPathname = pathname.split("/");
  const isSeledtedHome = splitedPathname[1] === "" ? "bg-accent" : "";
  const isSeledtedExplore = splitedPathname[1] === "explore" ? "bg-accent" : "";
  const isSeledtedViewPage =
    splitedPathname[1] === "view-page" ? "bg-accent" : "";
  const isSeledtedAccSettings =
    splitedPathname[1] === "profile-settings" ? "bg-accent" : "";
const [user, setUser] = useState<any>();

    useEffect(() => {
      async function fetchUser() {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
            {
              method: "POST",
              credentials: "include",
              headers: { Cookie: cookies.get().toString() },
            }
          );
          const data = await res.json()
          setUser(data.user.userId.id);
      }
  
      fetchUser();
    }, []);

  return (
    <div className="flex flex-col h-full gap-1 text-sm w-[251px] font-medium">
      <Link href="/">
        <button
          className={`rounded-md w-full flex py-2 px-4 ${isSeledtedHome}`}
        >
          Home
        </button>
      </Link>
      <Link href="/explore">
        <button
          className={`rounded-md w-full flex py-2 px-4 ${isSeledtedExplore}`}
        >
          Explore
        </button>
      </Link>
      <Link href={`/view-page/${user}`}>
        <button
          className={`rounded-md w-full py-2 px-4 flex items-center gap-2 ${isSeledtedViewPage}`}
        >
          <h3>View page</h3>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </Link>
      <Link href="/profile-settings">
        <button
          className={`rounded-md w-full flex py-2 px-4 ${isSeledtedAccSettings}`}
        >
          Account settings
        </button>
      </Link>
    </div>
  );
};
