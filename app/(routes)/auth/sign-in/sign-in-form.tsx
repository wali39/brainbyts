"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { signIn } from "next-auth/react";

import { Button, Form, Input, Spin } from "antd";

import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { LoadingOutlined, LockOutlined } from "@ant-design/icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SignInForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [spinning, setIsSpinnning] = useState(false);

  interface Loginprops {
    email: String;
    password: String;
  }
  const onFinish = async (loginInfo: Loginprops) => {
    try {
      setIsSpinnning(true);
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
      setIsSpinnning(false);
    }
  };

  return (
    <div className=" col-start-2 col-span-10 md:col-start-4 md:col-span-6 rounded-md  p-5 md:p-[30px] border-2 border-accent shadow-sm shadow-accent dark:text-white dark:bg-card dark:border-stone-500 dark:drop-shadow-md ">
      <Spin
        indicator={
          <AiOutlineLoading3Quarters className=" text-4xl font-extrabold animate-spin text-accent dark:text-stone-200" />
        }
        spinning={spinning}
      >
        <div className="text-center mx-auto mb-5  ">
          <FaRegCircleUser
            size={50}
            className="text-accent mx-auto dark:text-stone-100"
          />

          <p className="text-3xl  capitalize mx-auto  text-center text-[#6ec58b] dark:text-white">
            SignIn
          </p>
        </div>
        <Form name="login" onFinish={onFinish} disabled={isSubmitting}>
          <Form.Item
            name="email"
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
              className={`hover:bg-emerald-700 ${
                isSubmitting
                  ? "bg-stone-200 text-stone-400 "
                  : "bg-accent text-white border-none "
              }`}
              htmlType="submit"
            >
              Sign in
            </Button>
            <p className="mt-2 text-center text-sm dark:text-white">
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
      </Spin>
    </div>
  );
};

export default SignInForm;
