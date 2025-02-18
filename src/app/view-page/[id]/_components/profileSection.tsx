
'use client'
import { useState, useEffect } from 'react'; 
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { FaHeart } from "react-icons/fa";

interface Profile {
  id: string;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage?: string | null;
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
<<<<<<< HEAD
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/${id}`);
=======
          const res = await fetch(`http://localhost:5000/profile/${id}`);
>>>>>>> 62eef93 (update)
          const data = await res.json();
          console.log(data)
          setProfile(data);
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        } 
      }
    }

    fetchProfile();
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <div className="w-screen h-[319px] bg-[#F4F4F5] flex justify-center items-center relative">
        {profile.id === id && !image ? (
          <>

            <input
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              type="file"
            />
            <Button>Add a cover image</Button>
          </>
        ) : (
          <img
            src={image || profile.backgroundImage || 'https://via.placeholder.com/150'}
            className="bg-cover object-cover rounded-md w-full h-full"
            alt="Cover Image"
          />
        )}
      </div>

      <div className="w-full flex gap-8 justify-center absolute mt-[-3%]">
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
              <Button variant="secondary">Edit page</Button>
            </div>
            <div className="border-b w-[100%] h-[10%] mt-5"></div>

            <p className="font-semibold text-[16px] mt-7">About the creator</p>
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
      </div>
    </div>
  );
}