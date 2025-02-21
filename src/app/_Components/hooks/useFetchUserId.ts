import { useState, useEffect } from "react";
import cookies from "js-cookie";

const useUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);


useEffect(() => {
    async function fetchUser() {
      try {
        const token = cookies.get("token");

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`, {
          method: "POST",
          credentials: "include",
          headers: { Cookie: token ? `token=${token}` : "" },
        });

        const data = await res.json();

        if (!data.user) {
          return;
        }

        setUserId(data.user.userId.id);
      } catch (error) {
        console.error("Authentication error:", error);
   
      }
    }

    fetchUser();
  }, []);

  return { userId};
};

export default useUserId;
