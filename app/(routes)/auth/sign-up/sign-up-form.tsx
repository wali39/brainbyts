"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button, Form, Input } from "antd";

import { MdOutlineEmail } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const SignUpForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (userInfo: any) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/user/sign-up", userInfo);
      if (response?.data?.success) {
        toast.success(`${response?.data?.success}`);
        router.push("/auth/sign-in");
        router.refresh();
      } else {
        toast.error(`${response?.data?.error}`);
      }
    } catch (error) {
      console.log("[SIGN-UP-FORM]", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="col-start-2 col-span-10 md:col-start-4 md:col-span-6 rounded-xl shadow-xl p-5 md:p-[30px] border-2">
      <div className="text-center mx-auto mb-5  ">
        <FaRegCircleUser size={50} className="text-accent mx-auto" />

        <p className="text-3xl  capitalize mx-auto  text-center text-[#6ec58b]">
          SignUp
        </p>
      </div>
      <Form
        // {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        // initialValues={{remember:true}}
        disabled={isSubmitting}
        scrollToFirstError
        layout="vertical"
      >
        <Form.Item
          name="name"
          //   label="Username"
          //   tooltip="Required"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Name" size="large" />
        </Form.Item>
        <Form.Item
          name="email"
          // label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            prefix={<MdOutlineEmail />}
            placeholder="E-mail"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          // label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            autoComplete="new-password"
            size="large"
          />
        </Form.Item>

        <Form.Item
        //  {...tailFormItemLayout}
        >
          <Form.Item>
            <Button
              block
              className={`${
                isSubmitting
                  ? "bg-stone-200 text-stone-400 "
                  : "bg-accent text-white"
              }`}
              htmlType="submit"
            >
              Register
            </Button>
            <p className="mt-2 text-center text-sm ">
              Already signedUp?{" "}
              <Link
                href="/auth/sign-in"
                className="underline text-primary hover:text-primary"
              >
                SignIn now!
              </Link>
            </p>
          </Form.Item>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm;
