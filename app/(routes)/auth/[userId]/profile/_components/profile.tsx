"use client";
import { useSession } from "next-auth/react";

import NameForm from "./name-form";
import EmailForm from "./email-form";
import BioForm from "./bio-form";
import UserImageForm from "./user-image-form";

import { Profile as UserProfile, User } from "@/lib/types";
interface ProfileProps {
  user: User & UserProfile;
}

const Profile = ({ user }: ProfileProps) => {
  return (
    <div>
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
