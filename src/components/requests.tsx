"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MusicRequest } from "../../types";
import Error from "./error";
import Success from "./success";

export default function MusicRequests(props: MusicRequest) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.requesttitle}</CardTitle>
        <CardDescription>{props.requestdescription}</CardDescription>
      </CardHeader>
      <CardContent>
        {props.requestfullfilled ? <Success /> : <Error />}
      </CardContent>
      <CardFooter>Made By {props.email}</CardFooter>
    </Card>
  );
}
