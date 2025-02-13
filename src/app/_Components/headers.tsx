import { cookies } from "next/headers";


export default async function getHeaders(){
    const res = await fetch("http://localhost:5000" + "/get", {
        credentials: "include",
        headers: { Cookie: (await cookies()).toString() },
      });
      const data = await res.json();
}