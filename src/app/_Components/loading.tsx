import { type LottieComponentProps } from "lottie-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LazyLottieComponent = dynamic(() => import("lottie-react"), {
  ssr: false,
});

interface LottieProps<T extends Record<string, unknown>> {
  getJson: () => Promise<T>;
  id: string;
}

export function LazyLottie<T extends Record<string, unknown>>({
  getJson,
  id,
  ref,
  ...props
}: LottieProps<T> & Omit<LottieComponentProps, "animationData">) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getJson().then((json: any) => setData(json));
  }, [getJson]);

  return <LazyLottieComponent animationData={data} {...props} />;
}

const CoffeeLoading = () => (
  <LazyLottie
    getJson={() => import("./coffee.json")}
    loop
    id="empty-box"
    width={120}
    height={120}
  />
);

export default CoffeeLoading;
