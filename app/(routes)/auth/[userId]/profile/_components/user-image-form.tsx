"use client";
import { useState } from "react";

import { Form } from "antd";
import { BiEdit } from "react-icons/bi";
import { FaRegImage } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import userImage from "@/public/author.jpeg";
import { CldUploadWidget } from "next-cloudinary";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UserImageFormProps {
  imageUrl: string;
}
const UserImageForm = ({ imageUrl }: UserImageFormProps) => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing((current) => !current);
  };

  type formDatatype = {
    userImgUrl: String;
  };

  const onFinish = (formData: formDatatype) => {
    console.log("Success:", formData);
  };

  const onUpload = async (results: any) => {
    try {
      const imageInfo = results.info.files[0].uploadInfo;
      setIsSubmitting(true);
      await update({
        imageUrl: imageInfo.secure_url,
        publicId: imageInfo.public_id,
      });
      toast.success("Profile picture updated! ");
      router.refresh();
    } catch (error) {
      console.log("IMAGE_FORM", error);
      toast.error("Somthing went wrong!");
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
  };
  return (
    <div className="border-2 shadow-sm p-5 rounded-md bg-cardBg">
      <div className="flex justify-between mb-2 align-middle">
        <h4 className="text-lg font-medium">Profile picture</h4>
        <h4
          className="text-lg w-5 h-5 cursor-pointer "
          onClick={() => handleEdit()}
        >
          <BiEdit />
        </h4>
      </div>
      {!isEditing ? (
        <div
          className="h-[150px] w-[150px] mx-auto rounded-full   bg-accent flex items-center justify-center text-white 
        "
        >
          <FaRegImage size={30} />
          <Image
            src={imageUrl}
            alt=""
            height={150}
            width={150}
            className="h-[150px] w-[150px] mx-auto rounded-full object-cover"
          />
        </div>
      ) : (
        <Form
          name="userImgUrl"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            className=" flex justify-center items-center  mx-auto mb-0"
            name="userImgUrl"
            rules={[
              {
                required: true,
                message: "Please upload your profile picture!",
              },
            ]}
          >
            <CldUploadWidget
              onQueuesEnd={(results) => onUpload(results)}
              uploadPreset="brainbyts_user"
            >
              {({ open }) => {
                return (
                  <button onClick={() => open()}>
                    <div
                      className="h-[150px] w-[150px] mx-auto   bg-accent flex items-center justify-center text-white rounded-full
        "
                    >
                      <MdCloudUpload size={40} />
                    </div>
                  </button>
                );
              }}
            </CldUploadWidget>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default UserImageForm;
