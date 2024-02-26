"use client";

import { useEffect, useState } from "react";
import { Piece } from "../../../../../types";
import { useParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import PdfViewer from "./pdfviewer";
import BuyCard from "./buycard";
import useUser from "@/app/hooks/getuser";

export default function PiecePage() {
  const [pieceDetails, setPieceDetails] = useState<Piece>();
  const { id } = useParams();
  const { isReady, user } = useUser();

  useEffect(() => {
    try {
      fetch(`/api/piece/${id}`).then((res) => {
        res.json().then((result) => {
          if (result.status === 200) {
            setPieceDetails(result.piece);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      {isReady ? (
        <div className="flex w-full ">
          {pieceDetails ? (
            <div className="flex flex-col justify-center items-center w-full h-[90vh] bg-[#f0f0f0]">
              <div className="flex gap-x-4 items-center">
                <PdfViewer pdfUrl={pieceDetails.piecepreviewpdf} />
                <BuyCard
                  piecetitle={pieceDetails.piecetitle as any}
                  piecedescription={pieceDetails.piecedescription as any}
                  piecegrade={pieceDetails.piecegrade as any}
                  pieceprice={pieceDetails.pieceprice as any}
                  piececomposer={pieceDetails.fname + " " + pieceDetails.lname}
                  pieceid={pieceDetails.pieceid as any}
                  userid={pieceDetails.userid as any}
                />
              </div>
            </div>
          ) : (
            <div className="flex w-full justify-center items-center text-center">
              <Loader2Icon className="animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <div className="flex w-full justify-center items-center text-center">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
    </>
  );
}
