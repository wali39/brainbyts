"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button, Form } from "antd";
import TextArea from "antd/es/input/TextArea";

import { BiEdit } from "react-icons/bi";
import { CgDetailsLess, CgDetailsMore } from "react-icons/cg";
import { TbListDetails } from "react-icons/tb";
import { RiProfileLine } from "react-icons/ri";

const BioForm = ({ bio }: { bio?: string | null }) => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = () => {
    setIsEditing((current) => !current);
  };

  type formDatatype = {
    bio: String;
  };

  const onFinish = async (formData: formDatatype) => {
    try {
      setIsSubmitting(true);
      await update(formData);
      toast.success("Bio updated! ");
      router.refresh();
    } catch (error) {
      console.log("BIO_FORM", error);
      toast.error("Somthing went wrong!");
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
  };

  return (
    <div className="border-2 shadow-sm p-5 rounded-md bg-[#EBEEE3]">
      <div className="flex justify-between mb-2">
        <h4 className="md:text-lg font-medium flex items-center gap-x-1">
          <RiProfileLine />
          Bio
        </h4>
        <h4
          className="md:text-lg w-5 h-5 cursor-pointer"
          onClick={() => handleEdit()}
        >
          <BiEdit />
        </h4>
      </div>
      {!isEditing ? (
        bio ? (
          <p>{bio}</p>
        ) : (
          <p className="text-slate-500 italic">You have no bio add please !</p>
        )
      ) : (
        <Form
          name="bio"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          disabled={isSubmitting}
        >
          <Form.Item
            className="mb-3"
            name="bio"
            initialValue={bio}
            rules={[{ required: true, message: "Please input your bio!" }]}
          >
            <TextArea rows={4} size="large" placeholder="add bio..." />
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

export default BioForm;
