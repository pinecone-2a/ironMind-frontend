import { useState, useEffect } from "react";
import cookies from "js-cookie";

const useFetchUserData = (path: string) => {
  const [userData, setUserData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


useEffect(() => {
    async function fetchUser() {
        setLoading(true)
      try {
        const token = cookies.get("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`, {
          method: "GET",
          credentials: "include",
          headers: { Cookie: token ? `token=${token}` : "" },
        });

        const data = await res.json();

        if (!data.user) {
          return;
        }

       setUserData(data)
      } catch (error) {
        console.error("Authentication error:", error);
   
      } finally {
        setLoading(false)
      }
    }

    fetchUser();
  }, []);

  return { userData, loading};
};

export default useFetchUserData;
