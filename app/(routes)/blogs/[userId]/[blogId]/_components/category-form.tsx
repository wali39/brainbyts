"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Form, Select, Tooltip } from "antd";
import { BiCategory, BiEdit } from "react-icons/bi";
import { TbCategoryPlus } from "react-icons/tb";
import toast from "react-hot-toast";

interface CategoryFormProps {
  categoryId: string | null;
  categories: { name: string; id: string }[];
  authorId: string;
  blogId: string;
}

const CategoryForm = ({
  categoryId,
  categories,
  authorId,
  blogId,
}: CategoryFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const options = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));
  const selectedCategory = categories.find(
    (category) => category.id == categoryId
  ) || { id: "", name: "" };

  const handleEdit = () => {
    setIsEditing((current) => !current);
  };

  type formDatatype = {
    categoryId: String;
  };

  const onFinish = async (formData: formDatatype) => {
    try {
      setIsSubmitting(true);
      await axios.patch(`/api/blogs/${authorId}/${blogId}`, formData);
      toast.success("Category updated !");
      router.refresh();
    } catch (error) {
      toast.error("Somethin went wrong !");
      console.log("CATEGORY_ERROR", error);
    } finally {
      setIsSubmitting(false);
      setIsEditing(false);
    }
  };
  return (
    <div>
      <div className=" col-span-4 border-2 shadow-sm p-5 lg:h-[9.5rem] rounded-md bg-stone-50/50 backdrop-blur-sm border-stone-200/45">
        <div className="flex justify-between mb-2">
          <h4 className="md:text-lg font-medium flex items-center gap-x-1">
            <BiCategory />
            Category
          </h4>
          <h4
            className="md:text-lg w-5 h-5 cursor-pointer"
            onClick={() => handleEdit()}
          >
            <Tooltip title="Edit category">
              <BiEdit />
            </Tooltip>
          </h4>
        </div>
        {!isEditing &&
          (categoryId ? (
            <p className="p-2 md:text-lg font-extralight">
              {selectedCategory?.name}
            </p>
          ) : (
            <p className=" text-slate-400 text-base italic">
              No category added
            </p>
          ))}
        {isEditing && (
          <Form
            name="category"
            // initialValues={{ categoryId }}
            onFinish={onFinish}
            autoComplete="off"
            disabled={isSubmitting}
          >
            <Form.Item
              className="mb-3 font-bold"
              name="categoryId"
              initialValue={categoryId ? categoryId : null}
              rules={[{ required: true, message: "Please choose category!" }]}
            >
              <Select
                size="large"
                placeholder="Select a category"
                options={options}
                optionFilterProp="label"
                showSearch
                allowClear
              />
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
    </div>
  );
};

export default CategoryForm;
