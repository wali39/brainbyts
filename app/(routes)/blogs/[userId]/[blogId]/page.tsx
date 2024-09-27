import getCategories from "@/actions/get-categories";
import BlogForm from "./_components/blog-form";
import getBlog from "@/actions/get-blog";
import ActionList from "./_components/action-list";
import { HomeOutlined } from "@ant-design/icons";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import HeadingBreadcrump from "@/components/heading-n-breadcrum";

export default async function BlogEditPage({
  params,
}: {
  params: { userId: string; blogId: string };
}) {
  const { userId, blogId } = params;
  const categoryList = await getCategories();
  const blog = await getBlog({ userId, blogId });
  const requiredFields = [
    blog.title,
    blog.description,
    blog.category,
    blog.imageUrl,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;
  const isComplete = requiredFields.every(Boolean);
  const items = [
    {
      href: "/",
      title: (
        <>
          <HomeOutlined />,<span>Home</span>
        </>
      ),
    },
    { href: "/blogs", title: <span>Blogs</span> },
  ];
  return (
    <div className="mt-[100px]">
      <HeadingBreadcrump title="Blog creation" items={items} />
      <div className="p-3">
        {blog.isPublished ? (
          <div className="bg-accent text-white flex gap-x-2 items-center p-4  rounded-md text-base">
            <IoMdCheckmarkCircleOutline size={20} /> This blog is published. It
            is visible in blogs page
          </div>
        ) : (
          <div className="bg-amber-400 text-white flex gap-x-2 items-center p-4  rounded-md text-base">
            <IoWarningOutline size={20} /> This blog is not published. It is not
            visible in blogs page
          </div>
        )}
      </div>
      <div className="flex justify-between px-3 mb-10">
        <div>
          <h1 className="text-xl font-medium">Blog creation page</h1>
          <p className="text-base font-medium text-slate-500">
            Complete all fields <span>{completionText}</span>
          </p>
        </div>
        <ActionList blog={blog} isComplete={isComplete} />
      </div>
      {/* <div className="flex justify-between mb-[50px] p-2">
        <p className="text-xl font-medium flex gap-x-3 items-center ">
          <RiProfileLine
            size={40}
            className="bg-accent rounded-full p-2 text-white z-10"
          />
          Blog page
        </p>
        <p className=" text-white bg-accent px-3 py-2  flex  items-center gap-x-2 rounded-md">
          Exit <BiExit size={20} />
        </p>
      </div> */}
      <BlogForm categoryList={categoryList} blog={blog} />
    </div>
  );
}
