"use client";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Alert, Button, Form, Input, Tooltip } from "antd";

import { BiEdit } from "react-icons/bi";
import { MdTitle } from "react-icons/md";
import toast from "react-hot-toast";

interface TitleFormProps {
  title: string;
  authorId: string;
  blogId: string;
}
const TitleForm = ({ title, authorId, blogId }: TitleFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleEdit = () => {
    setIsEditing((current) => !current);
  };

  type formDatatype = {
    title: string;
  };

  const onFinish = async (formData: formDatatype) => {
    try {
      setIsSubmitting(true);

      await axios.patch(`/api/blogs/${authorId}/${blogId}`, formData);
      toast.success("Title updated!");

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("TITLE_ERROR", error);
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <div className="col-span-8 border-2  shadow-sm p-5  lg:h-40 items-center  rounded-md bg-card backdrop-blur-sm border-stone-200/45">
        <div className="flex justify-between mb-2">
          <h4 className=" md:text-lg md:font-medium flex gap-x-1 items-center">
            <MdTitle /> Title
          </h4>
          <h4
            className="md:text-lg w-5 h-5 cursor-pointer"
            onClick={() => handleEdit()}
          >
            <Tooltip className="Edit title">
              <BiEdit />
            </Tooltip>
          </h4>
        </div>
        {!isEditing ? (
          <p className=" md:text-xl p-2 ">{title}</p>
        ) : (
          <Form
            name="title"
            initialValues={{ title }}
            onFinish={onFinish}
            autoComplete="off"
            disabled={isSubmitting}
          >
            <Form.Item
              className="mb-3"
              name="title"
              rules={[{ required: true, message: "Please input blog title!" }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="text"
                className="bg-accent text-white  "
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

export default TitleForm;
