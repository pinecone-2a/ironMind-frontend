import { Button } from "@/components/ui/button";

export default function ProfileSection(){
    return(
        <div className="w-[632px] flex flex-col justify-between">
            <div className="border rounded-md p-5 bg-white">
                <div className="flex justify-between">
                  <div className="gap-3 flex items-center">
                   <div className="rounded-full w-[48px] h-[48px] bg-[#F4F4F5]"></div>
                   <p className="font-semibold text-[20px]">Name of the creator</p>
                  </div>
                  <Button variant="secondary">Edit page</Button>
                </div>
                <div className="border-b w-[100%] h-[10%] mt-5"></div>

                <p className="font-semibold text-[16px] mt-7">About the creator</p>
                <p className="text-[14px] mt-3">I’m a typical person who enjoys exploring different things. I also make music art as a hobby. Follow me along.</p>
            </div>

            <div className="border rounded-md p-5 mt-5 bg-white">
                <p className="font-semibold text-[16px]">Social media URL</p>
                <p className="text-[14px]">https://buymeacoffee.com/spacerulz44</p>
            </div>

            <div className="border rounded-md p-5 mt-5 bg-white">
                <p className="font-semibold text-[16px]">Recent supporters</p>
                <div className="w-[100%] h-[140px] border rounded-md flex justify-center items-center mt-4">
                    <p className="font-semibold text-[16px]">Be the first one to support Jake</p>
                </div>
            </div>
        </div>
    )
}