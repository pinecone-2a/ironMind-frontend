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
import { Link } from "lucide-react"

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

export function UsernameSignup({ onSubmit, onClick }: { onSubmit: (username: string) => void; onClick: () => void; }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
  
  const handleUsernameSubmit = () => {
    const username = form.getValues("username")
    if (username.length >= 2) {
      onSubmit(username)
    } else {
      form.setError("username", {
        message: "Username must be at least 2 characters",
      })
    }
  };

  const handleSubmit = () => {
     onClick()
  };

      return(
        <div className="h-screen w-[50%] justify-center items-center">
        <div className="h-screen w-[80%] justify-center items-center flex relative">
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
            <Button className="w-[100%]" onClick={handleUsernameSubmit}>Continue</Button>
           </form>
          </Form>
         </div>
         <button 
           className="bg-[#F4F4F5] px-5 py-3 rounded-md text-[14px] absolute top-10 right-0" 
           onClick={onClick}>Log In</button>

        </div>
        </div>
      )
}

export function EmailPasswordSignup({ username,onClick }: { username: string; onClick: () => void; }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username, email: "", password: "" 
    },
  })

  const handleClick = () => {
    onClick()
  }

const handleSubmit = (data: z.infer<typeof formSchema>) => {
  console.log("Form Data", data); 
};

  return(
    <div className="h-screen w-[50%] justify-center items-center">
    <div className="h-screen w-[80%] justify-center items-center flex relative">
    <div className=" flex flex-col items-start">
     <p className="font-semibold text-[24px] mb-2">Welcome, {username}</p>
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
     <button
       className="bg-[#F4F4F5] px-5 py-3 rounded-md text-[14px] absolute top-10 right-0"
       onClick={handleClick}>Log In</button>
    </div>
    </div>
  )
}

export function EmailPasswordLogin({onClick}: {onClick: () => void;}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {email: "",password: ""},
  })

  const handleClick = () => {
    onClick()
  }

const handleSubmit = (data: z.infer<typeof formSchema>) => {
  console.log("Form Data", data); 
};

  return(
    <div className="h-screen w-[50%] justify-center items-center">
    <div className="h-screen w-[80%] justify-center items-center flex relative">
    <div className=" flex flex-col items-start">
     <p className="font-semibold text-[24px] mb-2">Welcome back</p>
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
     <button
       className="bg-[#F4F4F5] px-5 py-3 rounded-md text-[14px] absolute top-10 right-0"
       onClick={handleClick}>Sign up</button>
    </div>
    </div>
  )
}