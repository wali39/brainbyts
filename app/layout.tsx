import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import Provider from "@/context/provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import PageTransitionEffect from "./PageTransitionEffect";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "BrainByts",
  description: "Explore new ideas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={`${roboto.className}  bg-background max-w-screen-lg mx-auto `}
      >
        <Provider session={session}>
          <AntdRegistry>
            <Navbar />
            <PageTransitionEffect> {children}</PageTransitionEffect>
            <Toaster />
          </AntdRegistry>
        </Provider>
      </body>
    </html>
  );
}
