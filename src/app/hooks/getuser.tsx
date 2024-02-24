"use client";

import { useEffect, useState } from "react";
import reactsecurestorage from "react-secure-storage";

interface user {
  userid: number;
  email: string;
  fname: string;
  lname: string;
  role: "member" | "composer" | "admin" | "owner";
}

interface userState {
  isReady: boolean;
  user: user | null;
  isSignedIn: boolean;
  error: boolean;
}

export default function useUser() {
  const [userDetails, setUserDetails] = useState<userState>({
    isReady: false,
    user: null,
    isSignedIn: false,
    error: false,
  });

  useEffect(() => {
    if (reactsecurestorage.getItem("session") === null) {
      setUserDetails({
        isReady: true,
        user: null,
        isSignedIn: false,
        error: false,
      });
    }
    try {
      fetch("/api/getuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionJWT: reactsecurestorage.getItem("session"),
        }),
      }).then((res) => {
        res.json().then((userdetails) => {
          if (userdetails.status === 200) {
            setUserDetails({
              isReady: true,
              user: userdetails.userData,
              isSignedIn: true,
              error: false,
            });
          } else {
            setUserDetails({
              isReady: true,
              user: null,
              isSignedIn: false,
              error: false,
            });
          }
        });
      });
    } catch (error) {
      console.error(error);
      setUserDetails({
        isReady: false,
        user: null,
        isSignedIn: false,
        error: true,
      });
    }
  }, []);

  return userDetails;
}
