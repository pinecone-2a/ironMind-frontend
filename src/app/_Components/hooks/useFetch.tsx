"use client";
import { useEffect, useState } from "react";

export default function onGet(path: string) {
  const [data, setData] = useState([]);
  async function getFetchData() {
    fetch(`http://localhost:5000/${path}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }
  useEffect(() => {
    getFetchData();
  }, []);
  return { data };
}
export const onPost = async (postPath: string, body: any) => {
  fetch(`http://localhost:5000/${postPath}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
