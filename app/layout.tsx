import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import Provider from "@/context/provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";

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
        className={`${roboto.className}   mx-auto absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_2px)] [background-size:16px_16px] max-w-screen-lg bg-fixed `}
      >
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
