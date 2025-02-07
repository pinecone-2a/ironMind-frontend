
import { Button } from "@/components/ui/button";
import * as React from "react"
import { Navigation } from "../(web)/_Components/Navigation";
import ProfileSection from "./_components/profileSection";
import DonatinSection from "./_components/donationSection";

export default function Page() {
  return (
    <>
      <Navigation/>
      <div className="w-screen h-[319px] bg-[#F4F4F5] flex justify-center items-center relative">
        <Button>Add a cover image</Button>
      </div>

      <div className="flex gap-8 justify-center absolute mt-[-3%]">
        <ProfileSection/>
        <DonatinSection/>
      </div>

    </>
  )

}
