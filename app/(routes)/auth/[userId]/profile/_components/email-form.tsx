"use client";

const EmailForm = ({ email }: { email?: string | null }) => {
  return (
    <div className="border-2 shadow-sm p-5 rounded-md bg-[#EBEEE3]">
      <div className="flex justify-between mb-2">
        <h4 className="md:text-lg font-medium">Email</h4>
      </div>
      <p className="text-base">{email}</p>
    </div>
  );
};

export default EmailForm;
