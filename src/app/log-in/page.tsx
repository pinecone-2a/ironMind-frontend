


"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { onPost } from "../_Components/hooks/useFetch"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Form,

  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { onPost } from "../_Components/hooks/useFetch"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(6, {
    message: "Password must be 6 or more characters long",
  }),
});


export default function EmailPasswordLogin() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });


const handleSubmit = async (data: z.infer<typeof formSchema>) => {

  
  onPost("user/auth/sign-in", data); 
  setTimeout(() => {
    router.push("/")
  }, 3000)


const handleSubmit = (data: z.infer<typeof formSchema>) => {
  onPost("user/auth/sign-in", data);

  console.log("Form Data", data); 
};


  return (
    <div className="flex justify-center">
      <div className="w-[50%] h-screen bg-[#FBBF24] flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/dht5mewgk/image/upload/v1738738837/kogl1awioe0xhgmtnj6y.png"
          className="h-screen"
        />
      </div>
      <div className="h-screen w-[50%] justify-center items-center">
        <div className="h-screen w-[80%] flex justify-center items-center relative">
          <div className="flex flex-col items-start">
            <p className="font-semibold text-[24px] mb-2">Welcome back</p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8 w-[140%]"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email here" {...field} />
                      </FormControl>
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link href="forgot-password">     <div className="text-center">Reset Password</div> </Link>
      
                <Button className="w-[100%]">Continue</Button>
              </form>
            </Form>
          </div>
          <Link href="/sign-up">
            <button className="bg-[#F4F4F5] px-5 py-3 rounded-md text-[14px] absolute top-10 right-0">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
