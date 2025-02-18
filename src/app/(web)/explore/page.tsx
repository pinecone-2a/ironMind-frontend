
'use client'
import { useState, useEffect } from "react";
import Link from "next/link";

interface Profile {
  id: number;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
}

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`); 
        const data: Profile[] = await res.json(); 
        setProfiles(data);
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      }
    };

    fetchProfiles();
  }, []); 
  
  return (
    <>
      <div className="w-[957px] h-[880px] p-5 ml-auto mr-auto mb-5">
        <h1 className="font-semibold text-[20px] mb-5">Explore creators</h1>
        <input
          className="h-[36px] w-[243px] border rounded-md mb-5 text-[14px] px-4"
          placeholder="Search name"
        />
        
        {profiles.map((profile) => (
          <div
            key={profile.id} 
            className="w-[909px] h-[224px] border rounded-md p-5 mb-5"
          >
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <div
                  className="w-[40px] h-[40px] border rounded-full"
                  style={{ backgroundImage: `url(${profile.avatarImage})`, backgroundSize: 'cover' }}
                ></div>
                <h1 className="font-semibold text-[20px]">{profile.name}</h1>
              </div>
              <Link href={`/view-page/${profile.id}`}>
                <button className="bg-[#F4F4F5] w-[136px] h-[40px] rounded-md">
                  View profile
                </button>
              </Link>
            </div>

            <div className="flex justify-between mt-4">
              <div className="flex flex-col w-[420px] gap-3">
                <p className="font-semibold">About {profile.name}</p>
                <p className="text-[14px]">{profile.about}</p>
              </div>

              <div className="flex flex-col w-[420px] gap-3">
                <p className="font-semibold">Social media URL</p>
                <p className="text-[14px]">
                  <a href={profile.socialMediaURL} target="_blank" rel="noopener noreferrer">
                    {profile.socialMediaURL}
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}


