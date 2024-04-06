"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { useRouter } from "next/navigation";

interface PieceTypes {
  piecetitle: string;
  piecedescription: string;
  piececomposer: string;
  piececover: string;
  pieceid: number;
}

export default function BoughtItemCard({
  piecetitle,
  piecedescription,
  piececover,
  piececomposer,
  pieceid,
}: PieceTypes) {
  const router = useRouter();

  return (
    <Card
      className="w-64 hover:cursor-pointer"
      onClick={() => router.push(`/library/piece/${pieceid}`)}
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
