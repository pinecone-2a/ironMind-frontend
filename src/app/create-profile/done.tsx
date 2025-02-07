import React from "react";
import { useLottie } from "lottie-react";
import coffee from "@/components/ui/coffee.json"

const Done = () => {
  const options = {
    animationData: coffee,
    loop: true
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};

export default Done;