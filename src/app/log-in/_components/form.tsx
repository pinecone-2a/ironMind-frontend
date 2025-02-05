"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email"
  }),
  password: z
  .string()
  .min(6,{
    message: "Password must be 6 or more characters long" 
  })
})

export function ProfileForm1({ onSubmit }: { onSubmit: (username: string) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
  const handleClick = () => {
    const username = form.getValues("username")
    if (username.length >= 2) {
      onSubmit(username)
    } else {
      form.setError("username", {
        message: "Username must be at least 2 characters",
      })
    }
  };

      return(
        <div className="h-screen w-[40%] justify-center items-center flex relative">
        <div className=" flex flex-col items-start">
         <p className="font-semibold text-[24px] mb-2">Create your account</p>
         <p className="text-[#71717A] text-[14px] mb-4">Choose a username for your page</p>
         <Form {...form}>
          <form className="space-y-8 w-[140%]">
           <FormField
             control={form.control}
             name="username"
             render={({ field }) => (
               <FormItem>
                 <FormLabel>Username</FormLabel>
                 <FormControl>
                   <Input placeholder="Enter username here" {...field} />
                 </FormControl>
                <FormMessage></FormMessage>
               </FormItem>
              )}
            />
            <Button className="w-[100%]" onClick={handleClick}>Continue</Button>
           </form>
          </Form>
         </div>
         <button className="bg-[#F4F4F5] px-5 py-3 rounded-md text-[14px] absolute top-7 right-0">Log In</button>
        </div>
      )
}

export function ProfileForm2({ username }: { username: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username, email: "", password: "" 
    },
  })


const handleSubmit = (data: z.infer<typeof formSchema>) => {
  console.log("Form Data", data); // You can handle form submission here
};

  return(
    <div className="h-screen w-[40%] justify-center items-center flex relative">
    <div className=" flex flex-col items-start">
     <p className="font-semibold text-[24px] mb-2">Welcome,  {username}</p>
     <p className="text-[#71717A] text-[14px] mb-4">Connect email and set a password</p>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-[140%]">
       <FormField
         control={form.control}
         name="email"
         render={({ field }) => (
           <FormItem>
             <FormLabel>Email</FormLabel>
             <FormControl>
               <Input placeholder="Enter email here" {...field} />
             </FormControl>
             <FormMessage/>
           </FormItem>
          )}
        />
       <FormField
         control={form.control}
         name="password"
         render={({ field }) => (
           <FormItem>
             <FormLabel>Password</FormLabel>
             <FormControl>
               <Input placeholder="Enter password here" {...field} />
             </FormControl>
             <FormMessage/>
           </FormItem>
          )}
        />
        <Button className="w-[100%]">Continue</Button>
       </form>
      </Form>
     </div>
     <button className="bg-[#F4F4F5] px-5 py-3 rounded-md text-[14px] absolute top-7 right-0">Log In</button>
    </div>
  )
}


