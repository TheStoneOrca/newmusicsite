"use client";

import { ReactNode, useEffect } from "react";
import useUser from "@/app/hooks/getuser";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, isReady } = useUser();

  useEffect(() => {
    if (!isReady) return;
    if (user?.role === "member") {
      window.location.href = "/";
    }
  }, [isReady]);
  return <>{children}</>;
}
