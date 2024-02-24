"use client";

import { ReactNode, useEffect } from "react";
import useUser from "../hooks/getuser";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isSignedIn, isReady } = useUser();

  useEffect(() => {
    if (!isReady) return;
    if (!isSignedIn) {
      window.location.href = "/signup";
    }
  }, [isReady]);
  return <>{children}</>;
}
