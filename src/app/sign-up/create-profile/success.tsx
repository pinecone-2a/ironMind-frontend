"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CoffeeLoading from "@/app/_Components/loading";

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
      <CoffeeLoading />
    </div>
  );
}
