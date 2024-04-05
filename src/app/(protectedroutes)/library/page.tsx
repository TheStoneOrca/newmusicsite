"use client";

import useUser from "@/app/hooks/getuser";
import { useEffect, useState } from "react";
import { BoughtItem } from "../../../../types";
import { Loader2 } from "lucide-react";
import PieceCard from "@/components/piececard";
import BoughtItemCard from "./__components/boughtitemcard";

export default function LibraryPage() {
  const [boughtItems, setBoughtItems] = useState<Array<BoughtItem>>();
  const { user, isReady } = useUser();

  useEffect(() => {
    if (isReady == false) return;

    fetch(`/api/boughtitem/${user?.userid}`).then((res) =>
      res.json().then((result) => {
        if (result.status === 200) {
          setBoughtItems(result.boughtitems);
        }
      })
    );
  }, [isReady]);
  return (
    <div className="flex h-full w-full">
      {boughtItems ? (
        <div className="flex w-full">
          <div className="flex flex-col gap-y-5 justify-center">
            {boughtItems.map((item) => (
              <BoughtItemCard
                piecetitle={item.piecetitle as any}
                piecedescription={item.piecedescription as any}
                piececomposer={item.fname + " " + item.lname}
                piececover={item.piececover as any}
              />
            ))}
          </div>
        </div>
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </div>
  );
}
