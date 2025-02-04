import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CreateProfile() {
 

 

  return (
  <div className=" h-screen w-screen bg-white flex justify-center items-center">

    <div className=" h-fit w-[510px] flex flex-col">  

    <h1 className="font-bold text-[24px] text-left mb-[26px]">Complete your profile page</h1>
    <label className="mt-8 text-[14px] font-[500] mb-[8px]" htmlFor="avatar">Add photo</label>
    <input id="avatar"  className="rounded-full border-[2px] border-gray-400 border-dashed h-[160px] w-[160px] mb-[24px]" type="file" accept="image"  />
    <label htmlFor="name">Name</label>
    <Input placeholder="Enter your name here" className="h-[40px] w-[510px] rounded-md py-[8px] px-[12px]" id="name"></Input>
    <label className="text-[14px] mt-[12px]" htmlFor="about">About</label>
   <Input className="h-[131px] w-[510px]" placeholder="Write about yourself here" id="about"></Input>
    <label className="text-[14px] mt-[12px]" htmlFor="url">Social media URL</label>
    <Input placeholder="https://" className="mb-[24px]" id="url"></Input>
    <Button className="items-left w-[246px] h-[40px]" >Continue</Button>
    

    </div>



  </div>
  )
}
