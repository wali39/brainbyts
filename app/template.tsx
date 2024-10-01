"use client";

import Navbar from "@/components/navbar";
import Provider from "@/context/provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const variants = {
    hidden: { opacity: 0, y: -5 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 0 },
  };
  const key = usePathname();

  return (
    <div>
        <AntdRegistry>
          <Navbar />

          <motion.div
            key={key}
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.25 }}
          >
            {children}
          </motion.div>
          <Toaster />
        </AntdRegistry>
    </div>
  );
}
