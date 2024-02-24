"use client";

import { Button } from "@/components/ui/button";
import Header from "./__components/header";
import TypeCard from "./__components/typecard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-10 w-full">
      <div className="flex justify-center text-center items-center">
        <Header />
      </div>
      <div className="flex flex-col w-full gap-y-2 justify-center items-center">
        <h1>We Have All Types of Music</h1>
        <div className="flex gap-x-10">
          <TypeCard type="Solo" />
          <TypeCard type="Orchestra" />
          <TypeCard type="Piano" />
          <TypeCard type="Band" />
          <TypeCard type="Rock" />
          <TypeCard type="Strings" />
        </div>
      </div>
      <div className="flex items-center justify-center text-center mt-48">
        <h1 className="sm:text-5xl md:text-6xl lg:text-4xl">
          For Anything Music, You Can Count On Us.
        </h1>
      </div>
      <div className="flex justify-center mt-64">
        <Button className="w-32" asChild>
          <Link href="/signup">Shop Now</Link>
        </Button>
      </div>
    </div>
  );
}
