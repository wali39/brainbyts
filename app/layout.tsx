import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
// import { SessionProvider } from "next-auth/react";
import SessionProvider from "../provider/session-provider";
import { getServerSession } from "next-auth";
import Provider from "@/context/provider";
import { getSession } from "next-auth/react";
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
        className={`${roboto.className}  bg-background max-w-screen-lg mx-auto `}
      >
        <Provider session={session}>
          <AntdRegistry>
            <Navbar />
            {children}
            <Toaster />
          </AntdRegistry>
        </Provider>
      </body>
    </html>
  );
}
