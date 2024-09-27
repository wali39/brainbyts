"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";

import { Form, Tooltip } from "antd";

import { BiEdit, BiTrash } from "react-icons/bi";
import { MdCloudUpload } from "react-icons/md";
import { RiImageLine } from "react-icons/ri";
import { FaImages, FaRegImage } from "react-icons/fa";
// import FormHeading from "@/components/form-heading";

interface BlogImageFormProps {
  imageUrl?: string;
  authorId: string;
  blogId: string;
}
const BlogImageForm = ({ imageUrl, authorId, blogId }: BlogImageFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  const handleEdit = () => {
    setIsEditing((current) => !current);
  };
  const handleDelete = () => {};

  const onUpload = async (results: any) => {
    const imageInfo = results.info.files[0].uploadInfo;

    try {
      setIsSubmitting(true);
      await axios.patch(`/api/blogs/${authorId}/${blogId}`, {
        imageUrl: imageInfo.secure_url,
        publicId: imageInfo.public_id,
      });

      router.refresh();
    } catch (error) {
      console.log("BLOG_IMAGE_ERROR", error);
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
  };
  return (
    <div>
      {/* <FormHeading title="Add blog Image" icon={FaRegImage} /> */}
      <div className=" border-2 shadow-sm p-5 rounded-md bg-[#EBEEE3]">
        <div className="flex justify-between mb-2 align-middle">
          <h4 className="md:text-lg font-medium flex items-center gap-x-1">
            <RiImageLine />
            Blog Image
          </h4>
          <h4
            className="md:text-lg w-5 h-5 cursor-pointer "
            onClick={() => handleEdit()}
          >
            <Tooltip title="Update blog Image">
              <BiEdit />
            </Tooltip>
          </h4>
        </div>
        {!isEditing ? (
          imageUrl ? (
            <div className="aspect-video rounded-md w-full relative">
              <span
                onClick={() => handleDelete()}
                className="absolute right-2 top-2 bg-primary p-2 rounded-md  text-white cursor-pointer"
              >
                <BiTrash />
              </span>
              <Image
                src={imageUrl}
                alt=""
                height={200}
                width={200}
                className="rounded-md  aspect-video w-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-video rounded-md w-full relative flex justify-center items-center text-slate-200 bg-accent">
              <span className="flex flex-col items-center">
                <FaRegImage size={30} />
                no image
              </span>
            </div>
          )
        ) : (
          <Form
            name="blogImage"
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              className="flex items-center justify-center mt-5 mb-0"
              name="Blog Image"
              rules={[
                {
                  required: true,
                  message: "Please upload blog Image!",
                },
              ]}
            >
              <CldUploadWidget
                onQueuesEnd={(results) => onUpload(results)}
                uploadPreset="brainbyts_blogs"
              >
                {({ open }) => {
                  return (
                    <button onClick={() => open()}>
                      <div className="w-[80vw] h-40 md:w-[20rem] lg:w-[25rem] lg:h-56  flex items-center justify-center  text-accent shadow-sm shadow-accent border-2 rounded-lg">
                        <div className="flex flex-col  items-center ">
                          <MdCloudUpload size={40} /> <span>Upload Image</span>
                        </div>
                      </div>
                    </button>
                  );
                }}
              </CldUploadWidget>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default BlogImageForm;
