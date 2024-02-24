"use client";

import React, { useEffect } from "react";
import useUser from "../hooks/getuser";

interface AuthLayout {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayout) {
  const { isSignedIn, isReady } = useUser();

  useEffect(() => {
    if (!isReady) return;
    if (isSignedIn) {
      window.location.href = "/music";
    }
  }, [isReady]);
  return <div> {children};</div>;
}
