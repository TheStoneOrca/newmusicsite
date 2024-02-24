"use client";

import RequestPieceForm from "./__components/form";

export default function RequestPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center h-[90vh]">
        <RequestPieceForm />
      </div>
    </div>
  );
}
