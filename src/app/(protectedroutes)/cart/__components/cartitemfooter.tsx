"use client";

import { Button } from "@/components/ui/button";

export default function CartItemFooter(props: {
  itemid: number;
  userid: number;
  pieceid: number;
}) {
  return (
    <div className="flex w-full justify-between">
      <Button
        onClick={() => {
          fetch("/api/cartitems", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userid: props.userid,
              pieceid: props.pieceid,
            }),
          }).then((res) =>
            res.json().then((result) => {
              if (result.status === 200) {
                window.location.reload();
              }
            })
          );
        }}
      >
        Add 1
      </Button>
      <Button
        variant="destructive"
        onClick={() => {
          fetch(`/api/cartitem/${props.itemid}`, { method: "DELETE" }).then(
            (res) =>
              res.json().then((result) => {
                if (result.status === 200) {
                  window.location.reload();
                }
              })
          );
        }}
      >
        Remove
      </Button>
    </div>
  );
}
