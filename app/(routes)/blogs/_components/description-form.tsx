import { useState } from "react";

import { Button, Form } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDescription } from "react-icons/md";

import Editor from "@/components/editor";
import Preview from "@/components/preview";

interface DescriptionFormProps {
  description: string;
}

const DescriptionForm = ({ description }: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing((current) => !current);
  };

  const onFinish = (formData: any) => {
    console.log("Success:", formData);
  };
  const [editorValue, setEditorValue] = useState("");
  return (
    <div className="border-2 shadow-sm p-5 rounded-md bg-[#EBEEE3]">
      <div className="flex justify-between mb-2">
        <h4 className="text-lg font-medium flex items-center gap-x-1">
          <MdOutlineDescription /> Description
        </h4>
        <h4
          className="text-lg w-5 h-5 cursor-pointer"
          onClick={() => handleEdit()}
        >
          <BiEdit />
        </h4>
      </div>
      {!isEditing ? (
        <Preview value={description} />
      ) : (
        <Form
          name="description"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            className="mb-3"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your blog description!",
              },
            ]}
          >
            <Editor value={editorValue} onChange={setEditorValue} />
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

export default DescriptionForm;
