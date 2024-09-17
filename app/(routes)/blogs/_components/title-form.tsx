import { useState } from "react";
import { Button, Form, Input } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdTitle } from "react-icons/md";
import axios from "axios";

interface TitleFormProps {
  title: string;
}
const TitleForm = ({ title }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing((current) => !current);
  };

  type formDatatype = {
    title: string;
  };

  const onFinish = async (formData: formDatatype) => {
    try {
      const res = await axios.patch("/api/blogs/userId/blogId", formData);
      console.log("title response", res.data);
    } catch (error) {
      console.log("error", error);
    }
    console.log("Success:", formData);
  };
  return (
    <div className="col-span-8 border-2 shadow-sm p-5  lg:h-40 items-center  rounded-md bg-[#EBEEE3]">
      <div className="flex justify-between mb-2">
        <h4 className=" md:text-lg md:font-medium flex gap-x-1 items-center">
          <MdTitle /> Title
        </h4>
        <h4
          className="md:text-lg w-5 h-5 cursor-pointer"
          onClick={() => handleEdit()}
        >
          <BiEdit />
        </h4>
      </div>
      {!isEditing ? (
        <p className=" md:text-xl p-2 ">{title}</p>
      ) : (
        <Form
          name="title"
          // initialValues={{ title }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            className="mb-3"
            name="title"
            initialValue={title}
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
  );
};

export default TitleForm;
