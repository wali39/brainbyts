"use client";
import { useSession } from "next-auth/react";

import NameForm from "./name-form";
import EmailForm from "./email-form";
import BioForm from "./bio-form";
import UserImageForm from "./user-image-form";

import { Profile as UserProfile, User } from "@/lib/types";

import { BiExit } from "react-icons/bi";
import { RiProfileLine } from "react-icons/ri";

interface ProfileProps {
  user: User & UserProfile;
}

const Profile = ({ user }: ProfileProps) => {
  return (
    <div>
      {/* <div className="flex justify-between mb-[50px] p-2">
        <p className="text-xl font-medium flex gap-x-3 items-center ">
          <RiProfileLine
            size={40}
            className="bg-accent rounded-full p-2 text-white z-10"
          />
          User profile
        </p>
        <p className=" text-white bg-accent px-3 py-2  flex  items-center gap-x-2 rounded-md">
          Exit <BiExit size={20} />
        </p>
      </div> */}
      <div className="grid grid-cols-1 p-3 md:grid-cols-1 gap-y-5 ">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-5  ">
          <NameForm name={user?.name} />
          <EmailForm email={user?.email} />
        </div>
        <div
          className=" grid grid-cols-1
        md:grid-cols-2 gap-5"
        >
          <BioForm bio={user?.bio} />
          <UserImageForm imageUrl={user?.imageUrl || ""} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
