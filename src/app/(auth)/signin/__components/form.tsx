"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormFooter from "./formfooter";
import HandleSubmit from "./onsubmit";
import { useState } from "react";

export default function SignInForm() {
  const [error, setError] = useState<string>();

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign into your account to buy music.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-y-2"
          action={(data: FormData) => HandleSubmit(data, setError)}
        >
          <div>
            <Label>Email</Label>
            <Input type="email" name="email" required />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" name="password" required />
          </div>

          {error && <h1>{error}</h1>}

          <Button type="submit" className="mt-3">
            Sign In
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col text-sm gap-y-2">
        <FormFooter />
      </CardFooter>
    </Card>
  );
}
