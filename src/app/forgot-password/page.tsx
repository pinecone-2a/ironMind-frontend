"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { onPut } from "../_Components/hooks/useFetch";
import OtpModal from "./verifyOTP";



export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await onPut("user/update/userId", { email });
      setError(response.message || "Failed to send reset link");

      if (response.message === "OTP sent to your email") {
        setShowOtpModal(true); // Show OTP modal if OTP is sent
      }
    } finally {
      setLoading(false);
    }
  };

  const closeOtpModal = () => {
    setShowOtpModal(false);
  };

  return (
    <div className="flex gap-[350px] ">
      <div className="w-[50%] h-screen bg-[#FBBF24] flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/dht5mewgk/image/upload/v1738738837/kogl1awioe0xhgmtnj6y.png"
          className="h-screen"
        />
      </div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card className="w-96 p-6 shadow-lg">
          <CardContent>
            <h2 className="text-xl font-semibold text-center mb-4">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full"
                  placeholder="Enter your email"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Reset Password"}
              </Button>
              {error && <p className="text-green-500 text-sm mt-2">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
      {showOtpModal && <OtpModal onClose={closeOtpModal} />}
    </div>
  );
  
}
