"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import Image from "next/image";

import { Form } from "antd";

import { SlPicture } from "react-icons/sl";
import { BiEdit } from "react-icons/bi";
import { FaRegImage } from "react-icons/fa";
import { MdCloudUpload, MdOutlinePhotoSizeSelectActual } from "react-icons/md";

interface UserImageFormProps {
  imageUrl: string;
}
const UserImageForm = ({ imageUrl }: UserImageFormProps) => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [isMount, setIsMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMount) return null;
  const handleEdit = () => {
    setIsEditing((current) => !current);
  };

  type formDatatype = {
    userImgUrl: String;
  };

  const onFinish = (formData: formDatatype) => {
  };

  const onUpload = async (results: any) => {
    try {
      const imageInfo = results.info.files[0].uploadInfo;
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
      setIsEditing(false);
    }
  };
  return (
    <div className="border-2 shadow-sm p-5 rounded-md bg-cardBg">
      <div className="flex justify-between mb-2 align-middle">
        <h4 className="text-lg font-medium flex items-center gap-x-1">
          <MdOutlinePhotoSizeSelectActual />
          Profile picture
        </h4>
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
          {!imageUrl && (
            <span className=" flex items-center flex-col italic">
              <FaRegImage size={30} />
              no profile picture
            </span>
          )}
          {imageUrl && (
            <Image
              src={imageUrl}
              alt=""
              height={150}
              width={150}
              className="h-[150px] w-[150px] mx-auto rounded-full object-cover"
            />
          )}
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
