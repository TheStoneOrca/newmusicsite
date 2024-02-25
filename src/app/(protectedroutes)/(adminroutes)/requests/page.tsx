"use client";

import { useEffect, useState } from "react";
import { MusicRequest } from "../../../../../types";
import { Loader2Icon } from "lucide-react";
import MusicRequests from "../../../../components/requests";

export default function RequestsPage() {
  const [requests, setRequests] = useState<Array<MusicRequest>>();

  useEffect(() => {
    fetch(`/api/requests`).then((res) => {
      res.json().then((result) => {
        if (result.status === 200) {
          setRequests(result.requests);
        }
      });
    });
  }, []);
  return (
    <div className="flex flex-col w-full h-full">
      {requests ? (
        <div className="w-full flex flex-col items-center justify-center mt-5 gap-y-5">
          {requests.map((request) => (
            <div
              onClick={() => {
                window.location.href = `/requests/${request.requestid}`;
              }}
              className="hover:cursor-pointer"
            >
              <MusicRequests
                key={request.requestid}
                requestid={request.requestid}
                requestaudiopreview={request.requestaudiopreview}
                requestdescription={request.requestdescription}
                requestfullfilled={request.requestfullfilled}
                requestgrade={request.requestgrade}
                requestimgcover={request.requestimgcover}
                requestmakerid={request.requestmakerid}
                requestpdf={request.requestpdf}
                requesttitle={request.requesttitle}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Loader2Icon className="flex justify-center items-center animate-spin" />
        </div>
      )}
    </div>
  );
}
