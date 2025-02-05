"use client"

import { useState } from "react";
import { ProfileForm1, ProfileForm2 } from "./_components/form"; 

export default function Form() {
  const [page, setPage] = useState(1)
  const [username, setUsername] = useState("")
  const handleForm1Submit = (username: string) =>{
    setUsername(username)
    setPage(2)
  }


  return (
    <div className="flex gap-8 justify-center">
      <img src="https://res.cloudinary.com/dht5mewgk/image/upload/v1738738837/kogl1awioe0xhgmtnj6y.png" className="h-screen"></img>
      {page === 1 && (<ProfileForm1 onSubmit={handleForm1Submit}/>)}
      {page === 2 && (<ProfileForm2 username={username}/>)}
    </div>
  )
}
