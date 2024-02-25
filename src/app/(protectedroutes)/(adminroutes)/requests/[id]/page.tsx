"use client";

import { useEffect, useState } from "react";
import { MusicRequest } from "../../../../../../types";
import { notFound, useParams } from "next/navigation";
import PdfViewer from "./__components/pdfviewer";
import { Loader2Icon } from "lucide-react";
import Success from "@/components/success";
import Error from "@/components/error";
import MarkAsCompleteBtn from "./__components/markascompletebtn";

export default function RequestPage() {
  const [requestDetails, setRequestDetails] = useState<MusicRequest>();
  const [fullfilled, setFullFilled] = useState<boolean>();

  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/requests/${id}`).then((res) => {
      res.json().then((result) => {
        if (result.status === 200) {
          setFullFilled(result.requests.requestfullfilled);
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
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex flex-col justify-center items-center w-full bg-[#f0f0f0]">
            <h1 className="sm:text-5xl md:text-6xl lg:text-4xl">
              {requestDetails.requesttitle}
            </h1>
            <h1 className="text-lg">{requestDetails.requestdescription}</h1>
            <h1 className="text-sm">
              By {requestDetails.fname} {requestDetails.lname}
            </h1>
            <h1 className="text-[12px]">Grade {requestDetails.requestgrade}</h1>
            <h1 className="text-[12px]">{requestDetails.requestprice}</h1>
            <div className="flex">
              <img src={requestDetails.requestimgcover} />
              <div className="items-center justify-center flex flex-col">
                <audio controls>
                  <source src={requestDetails.requestaudiopreview}></source>
                </audio>
                <PdfViewer pdfUrl={requestDetails?.requestpdf as any} />
              </div>
            </div>
            <div className="mt-5" />
          </div>
          <div className="mt-5 flex flex-col gap-y-5">
            {fullfilled ? <Success /> : <Error />}
            <MarkAsCompleteBtn
              changeFunction={setFullFilled}
              requestId={requestDetails.requestid as any}
            />
          </div>
        </div>
      ) : (
        <Loader2Icon className="animate-spin justify-center items-center flex" />
      )}
    </div>
  );
}
