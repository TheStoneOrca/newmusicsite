"use client";

import reactsecurestorage from "react-secure-storage";

export default function HandleSubmit(data: FormData, errorState: Function) {
  try {
    const userDetails = {
      email: data.get("email"),
      password: data.get("password"),
      fname: data.get("fname"),
      lname: data.get("lname"),
    };

    fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    }).then((res) => {
      res.json().then((userResult) => {
        if (userResult.status === 200) {
          reactsecurestorage.setItem("session", userResult.sessionJWT);
          window.location.href = "/music";
        } else {
          errorState(userResult.msg);
        }
      });
    });
  } catch (error) {
    console.error(error);
    errorState("Unexpected Server Error!");
  }
}
