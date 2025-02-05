// export default function Page() {
//     return(
//         <div className="flex gap-8 justify-center">
//             <img src="https://res.cloudinary.com/dht5mewgk/image/upload/v1738738837/kogl1awioe0xhgmtnj6y.png" className="h-screen"></img>
//             <div className="h-screen w-[40%] justify-center items-center flex relative">

//                 <div className=" flex flex-col items-start">
//                   <p className="font-semibold text-[24px] mb-2">Create your account</p>
//                   <p className="text-[#71717A] text-[14px] mb-4">Choose a username for your page</p>
//                   <p className="text-[14px] mb-[2px]">Username</p>
//                   <input className="rounded-md border p-2 px-3 w-[359px] text-[14px] mb-6" placeholder="Enter username here"></input>
//                   <button className="bg-[#E4E4E7] rounded-md p-2 w-[359px] text-white">Continue</button>
//                 </div>

//                 <button className="bg-[#F4F4F5] px-5 py-3 rounded-md text-[14px] absolute top-7 right-0">Log In</button>

//             </div>
//         </div>
//     )
// }


import { ProfileForm1 } from "./_components/forms"; 

export default function Form() {

  return (
    <div className="flex gap-8 justify-center">
    <img src="https://res.cloudinary.com/dht5mewgk/image/upload/v1738738837/kogl1awioe0xhgmtnj6y.png" className="h-screen"></img>
     <ProfileForm1/>
    </div>
  )
}
