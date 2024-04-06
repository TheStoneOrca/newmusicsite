"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

type BuyCardProps = {
  piecetitle: string;
  piecedescription: string;
  piecegrade: number;
  pieceprice: number;
  pieceid: number;
  userid: number;
  piececomposer: string;
};

export default function BuyCard({
  piecedescription,
  piecegrade,
  pieceprice,
  piecetitle,
  piececomposer,
  pieceid,
  userid,
}: BuyCardProps) {
  const router = useRouter();
  return (
    <Card className="h-64 w-72">
      <CardHeader>
        <CardTitle>{piecetitle}</CardTitle>
        <CardDescription>{piecedescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <h1>Grade {piecegrade}</h1>
        <h1>{pieceprice}</h1>
        <Button
          className="w-full"
          onClick={() => {
            try {
              fetch("/api/cartitems", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pieceid: pieceid, userid: userid }),
              }).then((res) => {
                res.json().then((result) => {
                  if (result.status === 200) {
                    router.push("/cart");
                  }
                });
              });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          Add To Cart
        </Button>
      </CardContent>
      <CardFooter>By {piececomposer}</CardFooter>
    </Card>
  );
}
