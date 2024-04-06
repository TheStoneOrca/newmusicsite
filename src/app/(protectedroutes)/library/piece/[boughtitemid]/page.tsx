"use client";

import useUser from "@/app/hooks/getuser";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BoughtItem } from "../../../../../../types";
import { Loader2Icon } from "lucide-react";
import PdfViewer from "@/components/pdfviewer";

export default function LibraryPiecePage() {
  const { user, isReady } = useUser();
  const { boughtitemid } = useParams();
  const router = useRouter();
  const [pieceDetails, setPieceDetails] = useState<BoughtItem>();

  useEffect(() => {
    if (isReady == false) return;

    fetch(`/api/boughtitem/${boughtitemid}`).then((res) =>
      res.json().then((result) => {
        if (result.status === 200) {
          if (result.boughtitem.buyer != user?.userid) {
            router.push("/error");

            return;
          }
          setPieceDetails(result.boughtitem);
        }
      })
    );
  }, [isReady]);

  return (
    <div className="flex w-full h-full">
      {pieceDetails ? (
        <div className="flex flex-col gap-y-5 justify-center w-full h-full text-center">
          <h1 className="text-3xl">{pieceDetails.piecetitle}</h1>
          <h1 className="text-sm">
            By {pieceDetails.fname + " " + pieceDetails.lname}
          </h1>
          <div className="flex justify-center items-center flex-col w-full">
            <PdfViewer pdfUrl={pieceDetails.piecepdf} />
          </div>
        </div>
      ) : (
        <Loader2Icon className="animate-spin" />
      )}
    </div>
  );
}
