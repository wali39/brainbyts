"use client";

import Navbar from "@/components/navbar";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/footer";

export default function Template({ children }: { children: React.ReactNode }) {
  const variants = {
    hidden: { opacity: 0, y: -5 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 0 },
  };
  const key = usePathname();

  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
          <Footer />
        </AntdRegistry>
      </ThemeProvider>
    </div>
  );
}
