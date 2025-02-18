"use client";
import { useEffect, useState } from "react";

export default function onGet(path: string) {
  const [data, setData] = useState([]);
  async function getFetchData() {
    fetch(`http://localhost:4500/${path}`)
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
    const response = await fetch(`http://localhost:4500/${postPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.log(error)
  }
};


export const onPut = async (postPath: string, body: any) => {
  try {
    const response = await fetch(`http://localhost4500/${postPath}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await response.json(); // Серверээс ирсэн өгөгдлийг JSON болгож буцаах
  } catch (error) {
    console.error("PUT request failed:", error);
    return { success: false }; // Алдааны бүтэцтэй хариу буцаах
  }
};


