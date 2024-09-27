"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Quill } from "react-quill";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}
const Font = Quill.import("formats/font");
Font.whitelist = ["roboto"];
Quill.register(Font, true);
const Editor = ({ onChange, value }: EditorProps) => {
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { list: "check" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      ["link", "image"],
      ["code"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "code",
    "link",
    "image",
  ];

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
    />
  );
};
export default Editor;
