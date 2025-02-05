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

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
})

export default function ProfileForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="flex gap-8 justify-center">
    <img src="https://res.cloudinary.com/dht5mewgk/image/upload/v1738738837/kogl1awioe0xhgmtnj6y.png" className="h-screen"></img>
    <div className="h-screen w-[40%] justify-center items-center flex relative">
     <div className=" flex flex-col items-start">
      <p className="font-semibold text-[24px] mb-2">Create your account</p>
      <p className="text-[#71717A] text-[14px] mb-4">Choose a username for your page</p>
      <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
           )}
         />
         <Button>Continue</Button>
        </form>
       </Form>
      </div>
     </div>
    </div>
  )
}
