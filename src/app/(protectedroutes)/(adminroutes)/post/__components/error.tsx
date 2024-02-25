"use client";

import { AlertTriangle } from "lucide-react";

export default function Error() {
  return (
    <div className="flex bg-destructive/15 text-destructive w-84 text-lg rounded-md h-12 items-center gap-x-1">
      <AlertTriangle /> Error, please try again!
    </div>
  );
}
