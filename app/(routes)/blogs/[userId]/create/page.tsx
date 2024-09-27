import { getUser } from "@/actions/get-user";
import BlogTitle from "./blog-title";
import { redirect } from "next/navigation";

export default async function BlogCreatepage({
  params,
}: {
  params: { userId: string };
}) {
  const user = await getUser(params.userId);
  if (user && !user.name) {
    redirect("/");
  }
  return (
    <div className="grid grid-cols-12  ">
      <BlogTitle />
    </div>
  );
}
