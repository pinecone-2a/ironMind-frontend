"use client";
import Player from "lottie-react"
import coffee from "@/app/create-profile/coffee.json"; // Place your animation inside 'public' folder

export default function LottieAnimation() {
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
