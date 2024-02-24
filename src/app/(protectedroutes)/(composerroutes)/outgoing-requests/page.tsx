"use client";

import { useEffect, useState } from "react";
import { MusicRequest } from "../../../../../types";
import useUser from "@/app/hooks/getuser";
import { Loader2Icon } from "lucide-react";
import MusicRequests from "./__components/requests";

export default function OutGoingRequestsPage() {
  const [requests, setRequests] = useState<Array<MusicRequest>>();
  const { user, isReady } = useUser();

  useEffect(() => {
    if (!isReady) return;
    fetch(`/api/requests/user/${user?.userid}`).then((res) => {
      res.json().then((result) => {
        if (result.status === 200) {
          setRequests(result.requests);
        }
      });
    });
  }, [isReady]);
  return (
    <div className="flex flex-col w-full h-full">
      {requests ? (
        <div className="w-full flex flex-col items-center justify-center mt-5 gap-y-5">
          {requests.map((request) => (
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
