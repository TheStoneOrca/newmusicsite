"use client";

import { Button } from "@/components/ui/button";

export default function MarkAsCompleteBtn(props: {
  changeFunction: Function;
  requestId: number;
}) {
  return (
    <Button
      onClick={() => {
        try {
          fetch(`/api/requests/complete/${props.requestId}`, {
            method: "PATCH",
          }).then((res) =>
            res.json().then((result) => {
              if (result.status === 200) {
                props.changeFunction(true);
              }
            })
          );
        } catch (error) {
          console.error(error);
        }
      }}
    >
      Mark As Complete
    </Button>
  );
}
