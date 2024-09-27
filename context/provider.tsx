"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

const Provider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
