"use client";

interface PdfViewer {
  pdfUrl: string;
}

export default function PdfViewer({ pdfUrl }: PdfViewer) {
  return (
    <div className="h-[550px] w-[500px]">
      <object data={pdfUrl} className="w-full h-full"></object>
    </div>
  );
}
