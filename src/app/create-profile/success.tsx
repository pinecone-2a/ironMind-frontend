"use client";
import { useEffect } from "react";
import Player from "lottie-react";
import coffee from "@/app/create-profile/coffee.json"; // Ensure the file path is correct
import { useRouter } from "next/navigation";

export default function LottieAnimation() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 5000); 

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Player
        animationData={coffee} // Correct prop for lottie-react
        loop
        autoplay
        style={{ height: "300px", width: "300px" }}
      />
    </div>
  );
}

