import { useState } from "react";

import { Button, Form, Select } from "antd";
import { BiCategory, BiEdit } from "react-icons/bi";

const { Option } = Select;

interface CategoryFormProps {
  categoryId: string;
}

const categoryList = [
  { name: "AI" },
  { name: "Fashion" },
  { name: "Nature" },
  { name: "Tech" },
];

const CategoryForm = ({ categoryId }: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing((current) => !current);
  };

  type formDatatype = {
    categoryId: String;
  };

  const onFinish = (formData: formDatatype) => {
    console.log("Success:", formData);
  };
  return (
    <div className=" col-span-4 border-2 shadow-sm p-5 lg:h-40 rounded-md bg-[#EBEEE3]">
      <div className="flex justify-between mb-2">
        <h4 className="md:text-lg font-medium flex items-center gap-x-1">
          <BiCategory />
          Category
        </h4>
        <h4
          className="md:text-lg w-5 h-5 cursor-pointer"
          onClick={() => handleEdit()}
        >
          <BiEdit />
        </h4>
      </div>
      {!isEditing ? (
        <p className="p-2 md:text-lg font-extralight">{categoryId}</p>
      ) : (
        <Form
          name="category"
          initialValues={{ categoryId }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            className="mb-3 font-bold"
            name="categoryId"
            initialValue={categoryId}
            rules={[{ required: true, message: "Please choose category!" }]}
          >
            <Select size="large">
              {categoryList.map((category) => (
                <Option key={category.name}>{category.name}</Option>
              ))}
            </Select>
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

export default CategoryForm;
