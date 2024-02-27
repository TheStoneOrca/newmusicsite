"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import CartItemFooter from "./cartitemfooter";

export default function CartItemCard(props: {
  itemimg: string;
  itemid: number;
  itemtitle: string;
  itemprice: number;
  pieceid: number;
  userid: number;
}) {
  return (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>{props.itemtitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={props.itemimg}
          width={30}
          height={30}
          alt="itemcoverimg"
          className="object-fill w-full"
        />
        <h1>{props.itemprice}</h1>
      </CardContent>
      <CardFooter>
        <CartItemFooter
          itemid={props.itemid as any}
          userid={props.userid}
          pieceid={props.pieceid}
        />
      </CardFooter>
    </Card>
  );
}
