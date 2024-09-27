"use client";
import ConfirmModal from "@/components/confirm-modal";
import { Button } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlinePublishedWithChanges } from "react-icons/md";

const ActionList = ({
  isComplete,
  blog,
}: {
  blog: {
    id: string;
    author: { id: string };
    isPublished: boolean;
  };
  isComplete: boolean;
}) => {
  const router = useRouter();
  const hanlePublish = async () => {
    try {
      const respnse = await axios.patch(
        `/api/blogs/${blog.author.id}/${blog.id}/publish`,
        { isPublished: !blog.isPublished }
      );
      toast.success("Blog pulished !");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong !");
      console.log("[ACTION_LIST_PUBLISH", error);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/blogs/${blog.author.id}/${blog.id}`);
      toast.success("Blog Deleted !");
      router.push("/");
    } catch (error) {
      toast.error("Someting went wrong!");
      console.log("BLOG_DELELE_ACTION", error);
    }
  };
  return (
    <div className="flex space-x-4">
      <Button
        className={`bg-accent text-white  py-5 ${
          !isComplete && "bg-secondary text-stone-200 "
        }`}
        disabled={!isComplete}
        onClick={hanlePublish}
      >
        {blog.isPublished ? "Unpublish" : "Publish"}
        <MdOutlinePublishedWithChanges className="font-bold" />
      </Button>
      <ConfirmModal onConfirm={() => handleDelete()}>
        <Button className="bg-primary text-white py-5 ">
          Delete <FaRegTrashAlt />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ActionList;
