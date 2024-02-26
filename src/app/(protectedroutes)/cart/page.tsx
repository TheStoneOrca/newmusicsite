"use client";

import useUser from "@/app/hooks/getuser";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [price, setPrice] = useState<string>("Loading...");
  const { isReady, user } = useUser();

  useEffect(() => {
    try {
      if (!isReady) return;
      fetch(`/api/cartitems/${user?.userid}`).then((res) =>
        res.json().then((cartitems) => {
          let totalPrice: number = 0;
          if (cartitems.status === 200) {
            cartitems.cartitems.forEach((price: any) => {
              totalPrice =
                totalPrice + Number(price.pieceprice.replace(/\$/g, ""));
            });
            setPrice(`$${totalPrice}`);
          }
        })
      );
    } catch (error) {
      console.error(error);
    }
  }, [isReady]);
  return <h1>{price}</h1>;
}
