import { useState } from "react";
import { Form } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
import { CldUploadWidget } from "next-cloudinary";
import { MdCloudUpload } from "react-icons/md";
import axios from "axios";
import Image, { StaticImageData } from "next/image";

import { RiImageLine } from "react-icons/ri";
import { FaRegImage } from "react-icons/fa";

interface BlogImageFormProps {
  imageUrl: string;
}
const BlogImageForm = ({ imageUrl }: BlogImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing((current) => !current);
  };
  const handleDelete = () => {};

  type formDatatype = {
    userImgUrl: String;
  };

  const onFinish = (formData: formDatatype) => {
    console.log("Success:", formData);
  };

  const onUpload = (results: any) => {
    console.log("onup", results.info.files[0].uploadInfo);
    // try {
    //   axios.post("/api/blog", {
    //     public_id: "brainbyts-blogs/zgy38xbapk9nsvkw77xl",
    //   });
    // } catch (error) {
    //   console.log("errors", error);
    // }
    // console.log("onup", results.info.files[0].uploadInfo.secure_url);
    // cloudinary.v2.uploader.destroy("adladf")
  };
  return (
    <div className=" border-2 shadow-sm p-5 rounded-md bg-[#EBEEE3]">
      <div className="flex justify-between mb-2 align-middle">
        <h4 className="md:text-lg font-medium flex items-center gap-x-1">
          <RiImageLine /> Blog Image
        </h4>
        <h4
          className="md:text-lg w-5 h-5 cursor-pointer "
          onClick={() => handleEdit()}
        >
          <BiEdit />
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
              className="rounded-md aspect-video w-full "
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
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
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
                    <div className="  aspect-video h-36 md:h-64 flex items-center justify-center  text-accent shadow-sm shadow-accent border-2 rounded-lg">
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
  );
};

export default BlogImageForm;
