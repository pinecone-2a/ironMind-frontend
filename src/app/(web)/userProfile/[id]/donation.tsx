import { VscCoffee } from "react-icons/vsc";

export default function DonationScreen() {
    return(
        <div className="w-[628px] rounded-md border p-5 bg-white">
            <p className="text-[24px] font-semibold">Buy them a coffee</p>
            <p className="text-[14px] mt-6 mb-2">Select amount:</p>
            <div className="flex gap-3 text-[14px]">
                <button className="rounded-lg bg-[#F4F4F5] py-3 px-4 flex items-center gap-2 hover:border-black border-2 border-white">
                    <VscCoffee/>
                    <p>$1</p>
                </button>
                <button className="rounded-lg bg-[#F4F4F5] py-3 px-4 flex items-center gap-2 hover:border-black border-2 border-white">
                    <VscCoffee/>
                    <p>$2</p>
                </button>
                <button className="rounded-lg bg-[#F4F4F5] py-3 px-4 flex items-center gap-2 hover:border-black border-2 border-white">
                    <VscCoffee/>
                    <p>$5</p>
                </button>
                <button className="rounded-lg bg-[#F4F4F5] py-3 px-4 flex items-center gap-2 hover:border-black border-2 border-white">
                    <VscCoffee/>
                    <p>$10</p>
                </button>
            </div>

            <p className="text-[14px] mt-6 mb-2">Enter BuyMeCoffee or social acount URL:</p>
            <input placeholder="buymeacoffee.com/" className="border rounded-md px-3 py-2 w-[100%] text-[14px]"></input>

            <p className="text-[14px] mt-6 mb-2">Special message:</p>
            <input placeholder="Please write your message here" className="border rounded-md px-3 py-2 w-[100%] text-[14px] h-[25%] flex items-start"></input>

            <button className="py-2 bg-[#18181B] flex justify-center items-center w-[100%] text-white mt-8 rounded-md hover:bg-[#616164] text-[14px]">Support</button>
        </div>
    )
}