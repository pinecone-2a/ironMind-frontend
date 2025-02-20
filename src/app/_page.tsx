import { UserProvider } from "@/context/AuthContext";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
     
        <Component {...pageProps} />

    </UserProvider>
  );
}

export default MyApp;
