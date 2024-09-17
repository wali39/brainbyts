import { useState } from "react";
import { Button, Form, Input } from "antd";
import { BiCategory, BiEdit } from "react-icons/bi";

interface CategoryFormProps {
  name: string;
}
const CategoryForm = ({ name }: CategoryFormProps) => {

  const handleEdit = () => {
  };

  type formDatatype = {
    name: String;
  };

  const onFinish = (formData: formDatatype) => {
    console.log("Success:", formData);
  };
  return (
    <div className="col-span-8 border-2 shadow-sm p-5  lg:h-40 items-center  rounded-md bg-[#EBEEE3]">
      <div className="flex justify-between mb-2">
        <h4 className=" md:text-lg md:font-medium flex gap-x-1 items-center">
        <BiCategory /> Category
        </h4>
        <h4
          className="md:text-lg w-5 h-5 cursor-pointer"
          onClick={() => handleEdit()}
        >
          <BiEdit />
        </h4>
      </div>
     
        <Form
          name="title"
          // initialValues={{ title }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            className="mb-3"
            name="title"
            initialValue={name}
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
      
    </div>
  );
};

export default CategoryForm;
