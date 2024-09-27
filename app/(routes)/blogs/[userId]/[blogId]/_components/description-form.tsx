"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Editor from "@/components/editor";
import Preview from "@/components/preview";

import { Button, Form, Tooltip } from "antd";

import { BiEdit } from "react-icons/bi";
import { MdOutlineDescription } from "react-icons/md";
import toast from "react-hot-toast";

interface DescriptionFormProps {
  description: string | null;
  authorId: string;
  blogId: string;
}

const DescriptionForm = ({
  description,
  authorId,
  blogId,
}: DescriptionFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = () => {
    setIsEditing((current) => !current);
  };

  const onFinish = async (formData: any) => {
    try {
      setIsSubmitting(true);

      await axios.patch(`/api/blogs/${authorId}/${blogId}`, formData);
      toast.success("Description updated!");

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("DESCRIPTION_ERROR", error);
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
  };
  return (
    <div className="border-2 shadow-sm p-5 rounded-md bg-[#EBEEE3]">
      <div className="flex justify-between mb-2">
        <h4 className="text-lg font-medium flex items-center gap-x-1">
          <MdOutlineDescription /> Description
        </h4>
        <h4
          className="text-lg w-5 h-5 cursor-pointer"
          onClick={() => handleEdit()}
        >
          <Tooltip className="Edit description">
            <BiEdit />
          </Tooltip>
        </h4>
      </div>
      {!isEditing ? (
        description && description.length ? (
          <Preview value={description} />
        ) : (
          <p className="text-base italic text-slate-400">No description</p>
        )
      ) : (
        <Form
          name="description"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          disabled={isSubmitting}
        >
          <Form.Item
            className="mb-3"
            name="description"
            initialValue={description}
            rules={[
              {
                required: true,
                message: "Please input your blog description!",
              },
            ]}
          >
            <Editor value="" onChange={() => {}} />
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
  );
};

export default DescriptionForm;
