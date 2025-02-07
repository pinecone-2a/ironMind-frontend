import { Coffee } from "lucide-react";
import { ChevronDown } from "lucide-react";
import {
DropdownMenu,
DropdownMenuTrigger,
DropdownMenuItem,
DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { Settings } from "lucide-react";
import { HelpCircle } from "lucide-react";
export const Navigation = () => {
return (
<div className="flex justify-between h-full font-mono px-24 py-8">
<div className="flex gap-2 text-black text-xl font-extrabold ">
<Coffee />
<h1>BUY ME COFFEE</h1>
</div>
<div className="flex gap-10 ">
<button className="flex justify-center items-center">
<Avatar>
<AvatarImage src="https://github.com/shadcn.png" />
<AvatarFallback>CN</AvatarFallback>
</Avatar>
Azaa

<div>
<DropdownMenu>
<DropdownMenuTrigger asChild>
<ChevronDown className=""/>
</DropdownMenuTrigger>
<DropdownMenuContent className=" grid gap-y-1">
<DropdownMenuItem className="flex justify-between">Help <HelpCircle /></DropdownMenuItem>
<DropdownMenuItem className="flex justify-between">Log out <LogOut /></DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>
</div>
</button>
</div>
</div>
);
};