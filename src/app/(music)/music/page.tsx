"use client";

import PieceCard from "@/components/piececard";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

interface Piece {
  pieceid: number;
  piecetitle: string;
  piecedescription: string;
  pieceowner: string;
  piececover: string;
  fname: string;
  lname: string;
}

export default function MusicPage() {
  const [music, setMusic] = useState<Array<Piece>>();

  useEffect(() => {
    try {
      fetch("/api/music").then((res) => {
        res.json().then((data) => {
          if (data.status === 200) {
            setMusic(data.pieces);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <div className="flex w-full">
      {music ? (
        <div className="w-full flex text-center ml-10 mt-10 gap-x-10">
          {music.map((piece) => (
            <PieceCard
              pieceid={piece.pieceid}
              piecetitle={piece.piecetitle}
              piecedescription={piece.piecedescription}
              piececomposer={piece.fname + " " + piece.lname}
              piececover={piece.piececover}
            />
          ))}
        </div>
      ) : (
        <Loader2Icon className="animate-spin flex justify-center items-center text-center" />
      )}
    </div>
  );
}
