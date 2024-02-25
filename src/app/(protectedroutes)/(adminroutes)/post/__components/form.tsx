"use client";

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
import HandlePostSubmit from "./handlesubmit";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import Error from "./error";

export default function PostPieceForm() {
  const [error, setError] = useState<boolean>(false);

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Post A Piece</CardTitle>
        <CardDescription>
          Post A Piece for the world to see and buy!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-y-2"
          action={(data: FormData) => {
            HandlePostSubmit(data).then((res) => {
              if (res.error) {
                setError(true);
              } else {
                window.location.href = "/music";
              }
            });
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
            <Label>Piece Price</Label>
            <Input type="number" name="price" required />
          </div>
          <div>
            <Label>
              Composer's Email
              <p className="text-sm">
                (Typed exactly as seen from the request)
              </p>
            </Label>
            <Input type="email" name="email" required />
          </div>
          <div>
            <Label>Piece Cover Image</Label>
            <Input type="file" accept=".png, .jpg" name="coverimg" required />
          </div>
          <div>
            <Label>Piece Preview PDF</Label>
            <Input type="file" accept=".pdf" name="previewpdf" required />
          </div>
          <div>
            <Label>Piece PDF</Label>
            <Input type="file" accept=".pdf" name="pdf" required />
          </div>
          <div>
            <Label>Piece Audio</Label>
            <Input type="file" accept=".mp3" name="audio" required />
          </div>
          {error && <Error />}
          <Button type="submit">Request</Button>
        </form>
      </CardContent>
    </Card>
  );
}
