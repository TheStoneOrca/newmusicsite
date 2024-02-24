"use client";

import useUser from "@/app/hooks/getuser";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon } from "lucide-react";
import HandleRequestSubmit from "./handlesubmit";

export default function RequestPieceForm() {
  const { isReady, user } = useUser();
  return (
    <>
      {isReady ? (
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Request A Piece</CardTitle>
            <CardDescription>
              Request your piece and it will be posted! We will also make a
              score video for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-y-5"
              action={(data: FormData) => {
                try {
                  HandleRequestSubmit(data).then((res) => {
                    if (res.success) {
                      window.location.href = "/outgoing-requests";
                    }
                  });
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              <div>
                <Label>Piece Title</Label>
                <Input type="text" name="title" required />
              </div>
              <div>
                <Label>Piece Description</Label>
                <Input type="text" name="desc" required />
              </div>
              <div>
                <Label>Piece Grade</Label>
                <Input type="number" name="grade" required />
              </div>
              <div>
                <Label>Piece Cover Image</Label>
                <Input
                  type="file"
                  accept=".png, .jpg"
                  name="coverimg"
                  required
                />
              </div>
              <div>
                <Label>Piece PDF</Label>
                <Input type="file" accept=".pdf" name="pdf" required />
              </div>
              <div>
                <Label>Piece Audio</Label>
                <Input type="file" accept=".mp3" name="audio" required />
              </div>
              <Input type="hidden" name="senderid" value={user?.userid} />
              <Button type="submit">Request</Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Loader2Icon className="w-64 h-64" />
      )}
    </>
  );
}
