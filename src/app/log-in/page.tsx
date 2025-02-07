"use client"

import { useState } from "react";
import { UsernameSignup, EmailPasswordSignup, EmailPasswordLogin } from "./_components/form"; 

export default function Form() {
  const [page, setPage] = useState(1)
  const [username, setUsername] = useState("")
  const handleFormReset = () =>{
    setPage(1)
  }
  const handleUsernameSubmit = (username: string) =>{
    setUsername(username)
    setPage(2)
  }

  const handleEmailPasswordSubmit = () =>{
    setPage(3)
  }

  return (
    <div className="flex justify-center">
      <div className="w-[50%] h-screen bg-[#FBBF24] flex items-center justify-center">
        <img src="https://res.cloudinary.com/dht5mewgk/image/upload/v1738738837/kogl1awioe0xhgmtnj6y.png" className="h-screen"></img>
      </div>
      {page === 1 && (<UsernameSignup onSubmit={handleUsernameSubmit} onClick={handleEmailPasswordSubmit}/>)}
      {page === 2 && (<EmailPasswordSignup onClick={handleEmailPasswordSubmit} username={username} />)}
      {page === 3 && (<EmailPasswordLogin onClick={handleFormReset}/>)}
    </div>
  )
}