"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { signIn } from "next-auth/react";

import { Button, Form, Input } from "antd";

import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { LockOutlined } from "@ant-design/icons";

const SignInForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  interface Loginprops {
    email: String;
    password: String;
  }
  const onFinish = async (loginInfo: Loginprops) => {
    try {
      setIsSubmitting(true);
      const response = await signIn("credentials", {
        email: loginInfo.email,
        password: loginInfo.password,
        redirect: false,
      });
      if (!response?.error) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log("[SIGN-IN-FORM]", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" col-start-2 col-span-10 md:col-start-4 md:col-span-6 rounded-md  p-5 md:p-[30px] border-2 border-accent shadow-sm shadow-accent">
      <div className="text-center mx-auto mb-5  ">
        <FaRegCircleUser size={50} className="text-accent mx-auto" />

        <p className="text-3xl  capitalize mx-auto  text-center text-[#6ec58b]">
          SignIn
        </p>
      </div>
      <Form name="login" onFinish={onFinish} disabled={isSubmitting}>
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
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            size="large"
          />
        </Form.Item>

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
            Sign in
          </Button>
          <p className="mt-2 text-center text-sm ">
            No Account?{" "}
            <Link
              href="/auth/sign-up"
              className="underline text-primary hover:text-primary"
            >
              SignUp now!
            </Link>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignInForm;
