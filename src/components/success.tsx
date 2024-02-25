"use client";

import { Check } from "lucide-react";

export default function Success() {
  return (
    <div className="flex bg-green-400 text-white w-84 text-md rounded-md h-12 items-center">
      <Check /> Request has been completed! Your piece has been posted!
    </div>
  );
}
