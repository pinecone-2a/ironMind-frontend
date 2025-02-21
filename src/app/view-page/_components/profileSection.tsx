
'use client'
import { useState, useEffect } from 'react'; 

import { Button } from '@/components/ui/button';
import { FaHeart } from "react-icons/fa";
import { useParams } from 'next/navigation';

export interface Profile {
  id: string;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage?: string | null;
  userId?: string
}

export default function ProfilePage() {
  const router = useParams();
  const { id } = router
  const [profile, setProfile] = useState<Profile | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (id) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id}`);
          const data = await res.json();
          console.log(data)
          setProfile(data.profile);
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        } 
      }
    }

    fetchProfile();
  }, [id]);
  console.log(profile)

  const handleUpdateProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);  
  };
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
        <div className="w-[632px] flex flex-col justify-between">
          <div className="border rounded-md p-5 bg-white">
            <div className="flex justify-between">
              <div className="gap-3 flex items-center">
                <div className="rounded-full w-[48px] h-[48px] bg-[#F4F4F5]">
                    
                  <img
                    src={profile.avatarImage}
                    alt={profile.name}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <p className="font-semibold text-[20px]">{profile.name}</p>
              </div>
              {/* <Button variant="secondary">Edit page</Button> */}
              <DialogDemo profile={profile} onUpdate={handleUpdateProfile}/>
            </div>
            <div className="border-b w-[100%] h-[10%] mt-5"></div>

            <p className="font-semibold text-[16px] mt-7">About {profile.name}</p>
            <p className="text-[14px] mt-3">{profile.about}</p>
          </div>

          <div className="border rounded-md p-5 mt-5 bg-white">
            <p className="font-semibold text-[16px]">Social media URL</p>
            <p className="text-[14px]">
              <a href={profile.socialMediaURL} target="_blank" rel="noopener noreferrer">
                {profile.socialMediaURL}
              </a>
            </p>
          </div>

          <div className="border rounded-md p-5 mt-5 bg-white">
            <p className="font-semibold text-[16px]">Recent supporters</p>
            <div className="w-[100%] h-[140px] border rounded-md flex flex-col gap-5 justify-center items-center mt-4">
              <FaHeart className="w-[25px] h-[30px]" />
              <p className="font-semibold text-[16px]">Be the first one to support {profile.name}</p>
            </div>
          </div>
        </div>

  );
}
interface DialogDemoProps {
  profile: Profile;
  onUpdate:  (updatedProfile: Profile) => void;
}









import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoCameraOutline } from "react-icons/io5";
import { AvatarImage } from '@radix-ui/react-avatar';

export function DialogDemo({ profile, onUpdate }: DialogDemoProps) {
  const [name, setName] = useState(profile.name);
  const [about, setAbout] = useState(profile.about);
  const [socialMediaURL, setSocialMediaURL] = useState(profile.socialMediaURL);

  const handleSubmit = async () => {
    const updatedProfile = {
      name,
      about,
      socialMediaURL,
      avatarImage:"dbuwb"
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/editProfile/${profile.id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

        const data = await response.json();
        onUpdate(data); 
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  console.log(profile.id)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[559px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div>
            <Label htmlFor="pfp">
              Add photo
            </Label>
            <div className="rounded-full w-[160px] h-[160px] bg-[#F4F4F5] relative">
             <img
              src={profile.avatarImage}
              alt={profile.name}
              className="rounded-full w-full h-full object-cover"
             />
             <IoCameraOutline className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-[28px] h-[28px]" />
           </div>
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div>
            <Label htmlFor="about">About</Label>
            <Input
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div>
            <Label htmlFor="url">Social media URL</Label>
            <Input
              id="url"
              value={socialMediaURL}
              onChange={(e) => setSocialMediaURL(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" className='bg-[#F4F4F5] text-black hover:text-white'>
            Cancel
          </Button>
         <DialogClose asChild>
         <Button type="button" onClick={()=> handleSubmit()}>Save changes</Button>
         </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// export function DialogDemo({ profile }: DialogDemoProps) {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">Edit Profile</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[559px]">
//         <DialogHeader>
//           <DialogTitle>Edit profile</DialogTitle>
//           <DialogDescription>
//             Make changes to your profile here. Click save when you're done.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//         <div>
//             <Label htmlFor="pfp">
//               Add photo
//             </Label>
//             <div className="rounded-full w-[160px] h-[160px] bg-[#F4F4F5] relative">
//              <img
//               src={profile.avatarImage}
//               alt={profile.name}
//               className="rounded-full w-full h-full object-cover"
//              />
//              <IoCameraOutline className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-[28px] h-[28px]" />
//            </div>
//           </div>
//           <div>
//             <Label htmlFor="name">
//               Name
//             </Label>
//             <Input
//               id="name"
//               defaultValue={profile.name}
//               className="col-span-3"
//             />
//           </div>
//           <div>
//             <Label htmlFor="about">
//               About
//             </Label>
//             <Input
//               id="about"
//               defaultValue={profile.about}
//               className="col-span-3"
//             />
//           </div>
//           <div>
//             <Label htmlFor="url">
//               Socila media URL
//             </Label>
//             <Input
//               id="url"
//               defaultValue={profile.socialMediaURL}
//               className="col-span-3"
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="submit" className='bg-[#F4F4F5] text-black hover:text-white'>Cancel</Button>
//           <Button type="submit">Save changes</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }