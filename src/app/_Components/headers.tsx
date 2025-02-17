import { cookies } from "next/headers";

export default async function getHeaders() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}` + "/get", {
    credentials: "include",
    headers: { Cookie: (await cookies()).toString() },
  });
  const data = await res.json();
}
