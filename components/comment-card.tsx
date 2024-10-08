"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

import ConfirmModal from "./confirm-modal";

import TextArea from "antd/es/input/TextArea";
import { Button, Form, Tooltip } from "antd";

import { PiArrowBendUpLeftBold } from "react-icons/pi";
import { BiEdit, BiTrash } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";

interface CommentCardProps {
  commentData: {
    id?: string;
    author: {
      id?: string;
      name?: string | null;
      imageUrl?: string;
      profile?: { imageUrl?: string | null } | null;
    };
    content?: string;
    createdAt: Date;
    editingState?: boolean;
  };
  blogId?: string;
}
const CommentCard = ({ commentData, blogId }: CommentCardProps) => {
  const { author, content, createdAt, editingState = false } = commentData;

  const router = useRouter();
  const { data: session } = useSession();

  const [isEditing, setIsEditing] = useState(editingState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form] = Form.useForm();

  const handleEdit = () => {
    setIsEditing((current) => !current);
  };

  const onFinish = async (value: any) => {
    try {
      setIsSubmitting(true);
      if (!commentData.id) {
        const response = await axios.post(
          `/api/blogs/${author.id}/${blogId}/comments`,
          value
        );
        toast.success("Comment created !");
        console.log("comment card ", response);
        form.resetFields();
      } else {
        console.log("blogid", blogId);
        const response = await axios.patch(
          `/api/blogs/${author.id}/${blogId}/comments/${commentData.id}`,
          value
        );
        toast.success("Comment updated !");
        console.log("comment updated", response);
        setIsEditing(false);
      }

      router.refresh();
    } catch (error) {
      console.log("COMMENT_COMCARD", error);
      toast.error("Someting went wrong !");
    } finally {
      setIsSubmitting(false);
    }
    console.log("comment data", value);
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/blogs/${author.id}/${blogId}/comments/${commentData.id}`
      );
      console.log("handleDelete comment", response);
      router.refresh();
    } catch (error) {
      console.log("[COMMENT_DELETE", error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="px-4  max-w-screen-sm md:max-w-screen-md lg:max-w-screen-md mt-10 ">
      <div className="flex gap-2 items-center mb-3 ">
        {author.profile && author.profile.imageUrl ? (
          <Image
            className="rounded-full w-8 md:w-12 border-2 dark:bg-white "
            src={author.profile.imageUrl}
            width={40}
            height={40}
            alt="Comment user"
          />
        ) : (
          <div className="rounded-full  border-2 p-2 w-8 md:w-12 text-slate-600 dark:bg-white ">
            <FaRegUser size={28} />
          </div>
        )}
        <div className="text-sm md:text-base font-medium">
          <p>{author.name}</p>
          <div className="flex items-center gap-x-2 text-slate-600 dark:text-slate-400">
            <p>{createdAt.toDateString()}</p>

            {session?.user?.id &&
              session.user.id === author.id &&
              !editingState && (
                <div className="flex space-x-2 relative ">
                  <p onClick={handleEdit} className="cursor-pointer">
                    <Tooltip title="Edit comment">
                      <BiEdit />
                    </Tooltip>
                  </p>
                  <span className="w-[2px] h-4 absolute bg-slate-500 left-[9px] md:left-3  " />
                  <p className="text-primary cursor-pointer">
                    <ConfirmModal onConfirm={handleDelete}>
                      <Tooltip title="Delete comment">
                        <BiTrash />
                      </Tooltip>
                    </ConfirmModal>
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
      <div className="ml-8">
        {!isEditing ? (
          <div className="flex ">
            <PiArrowBendUpLeftBold
              size={25}
              className="m-0  rotate-180 text-slate-600  font-extralight "
            />
            <div className="rounded-md py-4 px-3 text-sm  w-full  md:text-base font-medium m-0 bg-white border-2 border-slate-100 dark:bg-card dark:border-[1.5px] dark:border-stone-500">
              {content}
            </div>
          </div>
        ) : (
          <Form
            form={form}
            name="comment"
            initialValues={{ content }}
            onFinish={onFinish}
            autoComplete="off"
            disabled={isSubmitting}
          >
            <Form.Item
              className="mb-3"
              name="content"
              rules={[{ required: true, message: "Please input comment!" }]}
            >
              <TextArea size="large" rows={3} placeholder="add comment here" />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="text"
                className={`${
                  isSubmitting
                    ? "bg-stone-200 text-stone-400 "
                    : "bg-accent text-white"
                }`}
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
