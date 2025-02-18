import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function OtpModal({ onClose }: { onClose: () => void }) {


  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-6 rounded-md w-96">
          <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
          <Input type="text" className="w-full mb-4" placeholder="Enter OTP" />
          <div className="flex justify-between">
            <Button onClick={onClose} className="w-1/3">
              Cancel
            </Button>
            <Button className="w-1/3">Verify your OTP</Button>
          </div>
        </div>
      </div>
    );
  }