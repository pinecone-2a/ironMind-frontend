"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { onPost } from "../_Components/hooks/useFetch";
import { useRouter } from "next/navigation"; // ✅ Fix: Correct Import

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(6, {
    message: "Password must be 6 or more characters long",
  }),
});

export default function UsernameSignup({ onClick }: { onClick: () => void }) {
  const [step, setStep] = useState(1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const handleUsernameSubmit = () => {
    const username = form.getValues("username");
    if (username.length >= 2) {
      setStep(2);
    } else {
      form.setError("username", {
        message: "Username must be at least 2 characters",
      });
    }
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
        <div className="h-screen w-[80%] justify-center items-center flex relative">
          {step === 1 && (
            <div className="flex flex-col items-start">
              <p className="font-semibold text-[24px] mb-2">Create your account</p>
              <p className="text-[#71717A] text-[14px] mb-4">
                Choose a username for your page
              </p>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-[100%]" onClick={handleUsernameSubmit}>
                    Continue
                  </Button>
                </form>
              </Form>
            </div>
          )}
          {step === 2 && (
            <EmailPasswordSignup
              username={form.getValues("username")}
              onClick={onClick}
            />
          )}
          <Link href="/log-in">
            <button className="bg-[#F4F4F5] px-5 py-3 rounded-md text-[14px] absolute top-10 right-0">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function EmailPasswordSignup({
  username,
  onClick,
}: {
  username: string;
  onClick: () => void;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username,
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {

    try {
      const response = await fetch("http://localhost:5000/user/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await response.json();
      console.log("User Created:", result);

      router.push(`/create-profile?username=${encodeURIComponent(result.user.id)}`);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="h-screen w-[50%] justify-center items-center">
      <div className="h-screen w-[80%] justify-center items-center flex relative">
        <div className="flex flex-col items-start">
          <p className="font-semibold text-[24px] mb-2">Welcome, {username}</p>
          <p className="text-[#71717A] text-[14px] mb-4">
            Connect email and set a password
          </p>
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
                      <Input type="password" placeholder="Enter password here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-[100%]" type="submit">Continue</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
