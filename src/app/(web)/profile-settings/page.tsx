"use client";
import { Camera } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Page() {
  const [userId, setUserId] = useState<any>();
  const [profile, setProfile] = useState({
    name: "",
    about: "",
    avatarImage: "",
    socialMediaURL:"",
    backgroundImage:"",
    successMessage:""
  });
  const [bankCard, setBankCard] = useState<any>();
  console.log(profile?.avatarImage)

  useEffect(() => {
    async function fetchUser() {
      try {
        console.log(document.cookie, cookies.get());

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
          {
            method: "POST",
            credentials: "include",
            headers: { Cookie: cookies.get().toString() },
          }
        );

        const data = await res.json();
        setUserId(data.user.userId.id);
      } catch (error) {
        console.error("Authentication error:", error);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/getProfile/${userId}`
        );
        const data = await res.json();
        setProfile(data?.profile);
        setBankCard(data?.bankCard);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }

    fetchProfile();
  }, [userId]);

  const editProfile = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/updateProfile/${userId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(profile),
      }
    );
    alert("Edit is successfully")
  };

  const onChange = (e: any) => {
    console.log(e.target.value);
    console.log("--", e.target.name, e.target.value);
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const editBankCard = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bankcard/${userId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(bankCard),
    });
  };

  const onChangeBankcard = (e: any) => {
    console.log("--", e.target.name, e.target.value);
    setProfile({
      ...bankCard,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Food_delivery");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/df88yvhqr/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const dataJson = await response.json();
      setProfile((prev: any) => ({ ...prev, avatarImage: dataJson.secure_url }));
    }
  };

  return (
    <div className="max-w-[672px] w-[650px] flex flex-col gap-8  ">
      <h1 className="text-2xl font-semibold">My account</h1>
      <div
        className="bg-background rounded-lg p-6 flex flex-col gap-6 border border-border
      "
      >
        <h2 className="text-base font-bold">Personal info</h2>
        <label htmlFor="progileImg" className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">Add photo</h3>
          <div
            className="w-[160px] h-[160px] bg-cover bg-center  rounded-full flex items-center justify-center"
            style={{
              backgroundImage: `url(${profile?.avatarImage})`
            }}
          >
            <Camera size={23} color="gray" />
          </div>
          <input id="progileImg" type="file" className="hidden" onChange={handleUpload} />
        </label>
        <form action="" className="flex flex-col gap-3">
          <label htmlFor="name" className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Name</h3>
            <input
              value={profile?.name}
              onChange={onChange}
              type="text"
              id="name"
              name="name"
              className="w-full border border-border focus:outline-black rounded-lg p-3"
            />
          </label>
          <label htmlFor="name" className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">About</h3>
            <textarea
              name="about"
              id="about"
              value={profile?.about}
              onChange={onChange}
              cols={30}
              rows={10}
              className="w-full h-[131px] border border-border focus:outline-black rounded-lg p-3 text-primary"
              placeholder="about me"
            ></textarea>
          </label>
          <label htmlFor="socialUrl" className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Social media URL</h3>
            <input
              onChange={onChange}
              type="email"
              value={profile?.socialMediaURL}
              id="socialUrl"
              name="socialMediaURL"
              className="w-full border border-border focus:outline-black rounded-lg p-3"
            />
          </label>
        </form>
        <button
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium"
          onClick={() => {
            editProfile();
          }}
        >
          Save changes
        </button>
        
      </div>
      <div
        className="bg-background rounded-lg p-6 flex flex-col gap-6 border border-border
      "
      >
        <h2 className="text-base font-bold">Set a new password</h2>
        <form action="" className="flex flex-col gap-3 ">
          <label htmlFor="newPassword" className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">New password</h3>
            <input
              type="text"
              id="newPassword"
              placeholder="Enter new password"
              className="w-full border border-border focus:outline-black rounded-lg p-3"
            />
          </label>
          <label htmlFor="confirmPassword" className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Confirm Password</h3>
            <input
              type="text"
              id="confirmPassword"
              placeholder="Confirm password"
              className="w-full border border-border focus:outline-black rounded-lg p-3"
            />
          </label>
          <label htmlFor="socialUrl" className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Social media URL</h3>
            <input
              type="email"
              id="socialUrl"
              className="w-full border border-border focus:outline-black rounded-lg p-3"
            />
          </label>
        </form>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium">
          Save changes
        </button>
      </div>
      <div
        className="bg-background rounded-lg p-6 flex flex-col gap-6 border border-border
      "
      >
        <h2 className="text-base font-bold">Payment details</h2>
        <form action="" className="flex flex-col gap-3">
          <label className="flex flex-col gap-2 whitespace-nowrap">
            <h3 className="text-sm font-medium">Select country</h3>
            <Select name="country">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup onChange={onChangeBankcard}>
                  <SelectLabel>Country</SelectLabel>
                  <SelectItem value="unitedStates">United States</SelectItem>
                  <SelectItem value="mongolia">Mongolia</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="korea">Korea</SelectItem>
                  <SelectItem value="japanese">Japanese</SelectItem>
                  <SelectItem value="russia">Russia</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </label>

          <div className="flex gap-4 w-full">
            <label htmlFor="firstname" className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">First name</h3>
              <input
                name="firstName"
                value={bankCard?.firstName}
                onChange={onChangeBankcard}
                type="text"
                id="firstname"
                placeholder="First name"
                className="border w-[292px] border-border focus:outline-black rounded-lg p-3"
              />
            </label>
            <label htmlFor="lastname" className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Last name</h3>
              <input
                name="lastName"
                value={bankCard?.lastName}
                onChange={onChangeBankcard}
                type="text"
                id="lastname"
                placeholder="Last name"
                className="border border-border w-[292px] focus:outline-black rounded-lg p-3"
              />
            </label>
          </div>
          <label htmlFor="cardNumber" className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Enter card number</h3>
            <input
              type="number"
              name="cardNumber"
              value={bankCard?.cardNumber}
              onChange={onChangeBankcard}
              id="cardNumber"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              className="border border-border  focus:outline-black rounded-lg p-3"
              maxLength={16}
            />
          </label>
          <div className="flex gap-4 w-full">
            <label className="w-full flex flex-col gap-2 whitespace-nowrap">
              <h3 className="text-sm font-medium">Expires</h3>
              <Select name="expiryDate">
                <SelectTrigger className="">
                  <SelectValue
                    placeholder={bankCard?.expiryDate}
                    onChange={onChangeBankcard}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Month</SelectLabel>
                    <SelectItem value="january">January</SelectItem>
                    <SelectItem value="february">February</SelectItem>
                    <SelectItem value="march">March</SelectItem>
                    <SelectItem value="april">April</SelectItem>
                    <SelectItem value="may">May</SelectItem>
                    <SelectItem value="june">June</SelectItem>
                    <SelectItem value="july">July</SelectItem>
                    <SelectItem value="august">August</SelectItem>
                    <SelectItem value="september">September</SelectItem>
                    <SelectItem value="october">October</SelectItem>
                    <SelectItem value="november">November</SelectItem>
                    <SelectItem value="december">December</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </label>
            <label className="w-full flex flex-col gap-2 whitespace-nowrap">
              <h3 className="text-sm font-medium">Year</h3>
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Year" onChange={onChangeBankcard} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Year</SelectLabel>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                    <SelectItem value="2028">2028</SelectItem>
                    <SelectItem value="2029">2029</SelectItem>
                    <SelectItem value="2030">2030</SelectItem>
                    <SelectItem value="2031">2031</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </label>
            <label htmlFor="cvc" className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">CVC</h3>
              <input
                name="cvc"
                type="number"
                id="cvc"
                value={bankCard?.cvc}
                onChange={onChangeBankcard}
                placeholder="123"
                className="px-2 py-[7px] text-sm placeholder:text-sm font-normal border border-border focus:outline-black rounded-md "
                maxLength={3}
              />
            </label>
          </div>
        </form>
        <button
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium"
          onClick={() => {
            editBankCard();
          }}
        >
          Save changes
        </button>
      </div>
      <div
        className="bg-background rounded-lg p-6 flex flex-col gap-6 border border-border
      "
      >
        <h2 className="text-base font-bold">Success page</h2>
        <label htmlFor="confirmationMessage" className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">Confirmation message</h3>
          <textarea
            name="confirmationMessage"
            id="confirmationMessage"
            cols={30}
            rows={10}
            className="w-full h-[131px] border border-border focus:outline-black rounded-lg p-3 text-primary"
            placeholder="confirmation message..."
          ></textarea>
        </label>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium">
          Save changes
        </button>
      </div>
    </div>
  );
}
