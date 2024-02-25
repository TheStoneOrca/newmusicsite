"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useRouter } from "next/navigation";

interface PieceTypes {
  pieceid: number;
  piecetitle: string;
  piecedescription: string;
  piececomposer: string;
  piececover: string;
}

export default function PieceCard({
  pieceid,
  piecetitle,
  piecedescription,
  piececover,
  piececomposer,
}: PieceTypes) {
  const router = useRouter();

  return (
    <Card
      className="w-64 hover:cursor-pointer"
      onClick={() => {
        router.push(`/piece/${pieceid}`);
      }}
    >
      <CardHeader>
        <CardTitle>{piecetitle}</CardTitle>
        <CardDescription>{piecedescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={piececover}
          width={24}
          height={24}
          className="w-full h-full"
          alt="Piece COver"
        />
      </CardContent>
      <CardFooter>By {piececomposer}</CardFooter>
    </Card>
  );
}
