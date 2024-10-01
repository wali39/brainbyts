"use client";

import { HiOutlineMail } from "react-icons/hi";

const EmailForm = ({ email }: { email?: string | null }) => {
  return (
    <div className="border-2 shadow-sm p-5 rounded-md bg-stone-50/50 backdrop-blur-sm border-stone-200/45">
      <div className="flex justify-between mb-2">
        <h4 className="md:text-lg font-medium flex items-center gap-x-1">
          <HiOutlineMail size={20} />
          Email
        </h4>
      </div>
      <p className="text-base">{email}</p>
    </div>
  );
};

export default EmailForm;
