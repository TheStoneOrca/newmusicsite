"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function TypeCard(props: {
  type: "Strings" | "Band" | "Orcherstra" | "Piano" | "Solo" | "Rock";
}) {
  return (
    <Card>
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
