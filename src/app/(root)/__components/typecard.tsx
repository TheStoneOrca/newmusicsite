"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function TypeCard(props: {
  type: "Strings" | "Band" | "Orchestra" | "Piano" | "Solo" | "Rock";
}) {
  return (
    <Card className="w-48">
      <CardHeader>
        <CardTitle>{props.type}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href={`/music/${props.type.toLowerCase()}`}>View</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
