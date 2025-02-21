"use client";
import { useEffect, useState } from "react";
import cookies from "js-cookie";

export default function onGet(path: string) {
  const [data, setData] = useState([]);
  async function getFetchData() {


    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }
  useEffect(() => {
    getFetchData();
  }, []);
  return { data };
}


export const onPost = async (postPath: string, body: any) => {
  try {

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${postPath}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {

    return error;

  }
};

export const onPut = async (postPath: string, body: any) => {
  try {

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${postPath}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    return await response.json(); 
  } catch (error) {
    console.error("PUT request failed:", error);
    return { success: false }; 
  }
};


