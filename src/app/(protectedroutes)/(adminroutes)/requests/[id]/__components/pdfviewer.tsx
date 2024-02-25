"use client";

interface PdfViewer {
  pdfUrl: string;
}

export default function PdfViewer({ pdfUrl }: PdfViewer) {
  return (
    <div className="h-[550px] w-[500px]">
      <embed src={pdfUrl} type="application/pdf" className="w-full h-full" />
    </div>
  );
}
