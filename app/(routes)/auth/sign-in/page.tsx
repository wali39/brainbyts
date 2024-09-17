import { getServerSession } from "next-auth";
import SignInForm from "./sign-in-form";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="grid grid-cols-12 md:grid-cols-12 justify-center   mt-[100px] ">
      <SignInForm />
    </div>
  );
}
