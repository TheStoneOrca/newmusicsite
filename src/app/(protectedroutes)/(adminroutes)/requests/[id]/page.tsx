"use client";

import { useEffect, useState } from "react";
import { MusicRequest } from "../../../../../../types";
import { notFound, useParams } from "next/navigation";
import PdfViewer from "./__components/pdfviewer";
import { Loader2Icon } from "lucide-react";
import Success from "@/components/success";
import Error from "@/components/error";

export default function RequestPage() {
  const [requestDetails, setRequestDetails] = useState<MusicRequest>();

  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/requests/${id}`).then((res) => {
      res.json().then((result) => {
        console.log(result);
        if (result.status === 200) {
          setRequestDetails(result.requests);
        } else {
          notFound();
        }
      });
    });
  }, []);
  return (
    <div className="flex flex-col w-full">
      {requestDetails ? (
        <div className="flex flex-col justify-center items-center h-[90vh]">
          <h1 className="sm:text-5xl md:text-6xl lg:text-4xl">
            {requestDetails.requesttitle}
          </h1>
          <h1 className="text-lg">{requestDetails.requestdescription}</h1>
          <h1 className="text-sm">
            By {requestDetails.fname} {requestDetails.lname}
          </h1>
          <h1 className="text-[12px]">Grade {requestDetails.requestgrade}</h1>
          <PdfViewer pdfUrl={requestDetails?.requestpdf as any} />

          <div className="mt-5">
            {requestDetails.requestfullfilled ? <Success /> : <Error />}
          </div>
        </div>
      ) : (
        <Loader2Icon className="animate-spin justify-center items-center flex" />
      )}
    </div>
  );
}
