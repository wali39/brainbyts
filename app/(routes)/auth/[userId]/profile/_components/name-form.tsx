"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button, Form, Input } from "antd";

import { BiEdit } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";

interface NameformProps {
  name?: string | null;
}
const NameForm = ({ name }: NameformProps) => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = () => {
    setIsEditing((current) => !current);
  };

  type formDatatype = {
    name?: String;
  };

  const onFinish = async (formData: formDatatype) => {
    try {
      setIsSubmitting(true);
      await update(formData);
      toast.success("Username updated! ");
      router.refresh();
    } catch (error) {
      console.log("NAME_FORM", error);
      toast.error("Somthing went wrong!");
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
  };

  return (
    <div className="border-2 shadow-sm p-5 rounded-md bg-stone-50/50 backdrop-blur-sm border-stone-200/45">
      <div className="flex justify-between mb-2">
        <h4 className="md:text-lg font-medium flex gap-1 items-center">
          <FaRegUser size={16} /> Name
        </h4>
        <h4
          className="md:text-lg w-5 h-5 cursor-pointer"
          onClick={() => handleEdit()}
        >
          <BiEdit />
        </h4>
      </div>
      {!isEditing ? (
        <p>{name}</p>
      ) : (
        <Form
          name="name"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          disabled={isSubmitting}
          autoComplete="off"
        >
          <Form.Item
            className="mb-3"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
            initialValue={name}
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
  );
};

export default NameForm;
