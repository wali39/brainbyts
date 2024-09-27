import { getUser } from "@/actions/get-user";
import CreateCategoryForm from "./_components/category-create-form";
import { redirect } from "next/navigation";

export default async function CategoryCreatePage({
  params,
}: {
  params: { userId: string };
}) {
  const user = await getUser(params.userId);
  if (user.name && user.role !== "admin") {
    redirect("/");
  }
  return (
    <div className="grid grid-cols-12  md:grid-cols-12">
      <CreateCategoryForm />
    </div>
  );
}
