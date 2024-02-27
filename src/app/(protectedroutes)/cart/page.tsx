"use client";

import useUser from "@/app/hooks/getuser";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import CartItemCard from "./__components/cartitemcard";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";

export default function CartPage() {
  const [items, setItems] = useState<Array<any>>();
  const [checkoutItems, setCheckoutItems] =
    useState<Array<{ itemname: string; itemid: number; itemprice: number }>>();
  const [price, setPrice] = useState<string>();
  const { isReady, user } = useUser();

  useEffect(() => {
    try {
      if (!isReady) return;
      fetch(`/api/cartitems/${user?.userid}`).then((res) =>
        res.json().then((cartitems) => {
          setItems(cartitems.cartitems);
          let totalPrice: number = 0;
          const cartItems = cartitems.cartitems.map((item: any) => {
            return {
              itemname: item.piecetitle,
              itemid: item.pieceid,
              itemprice: Number(item.pieceprice.replace(/\$/g, "")),
            };
          });
          setCheckoutItems(cartItems);
          if (cartitems.status === 200) {
            cartitems.cartitems.forEach((price: any) => {
              totalPrice =
                totalPrice + Number(price.pieceprice.replace(/\$/g, ""));
            });
            setPrice(`$${totalPrice}.00`);
          }
        })
      );
    } catch (error) {
      console.error(error);
    }
  }, [isReady]);
  return (
    <div className="flex flex-col w-full">
      {price && items && isReady && checkoutItems ? (
        <div className="flex flex-col ml-10 gap-y-5 mt-5">
          {items.map((item) => (
            <CartItemCard
              key={item.itemid}
              itemimg={item.piececover}
              itemid={item.itemid as any}
              itemtitle={item.piecetitle as any}
              itemprice={item.pieceprice as any}
              pieceid={item.pieceid}
              userid={user?.userid as any}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
      <div className="flex flex-col items-center gap-y-1 justify-center">
        <h1>{price}</h1>
        <Button
          onClick={() => {
            fetch("/api/checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userid: user?.userid,
                items: checkoutItems,
              }),
            }).then((res) =>
              res.json().then((result) => {
                if (result.status === 200) {
                  loadStripe(
                    process.env.NEXT_PUBLIC_STRIPE_PUBLIC as string
                  ).then((stripeObject) => {
                    stripeObject?.redirectToCheckout({
                      sessionId: result.checkoutsession,
                    });
                  });
                }
              })
            );
          }}
        >
          {price ? "Checkout" : "Loading..."}
        </Button>
      </div>
    </div>
  );
}
