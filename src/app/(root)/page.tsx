"use client";

import Header from "./__components/header";
import TypeCard from "./__components/typecard";

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
          <TypeCard type="Orcherstra" />
          <TypeCard type="Piano" />
        </div>
      </div>
    </div>
  );
}
