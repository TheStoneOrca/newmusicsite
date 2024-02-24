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

export default function SignUpForm() {
  const [error, setError] = useState<string>();

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to buy music.</CardDescription>
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
          <div>
            <Label>First Name</Label>
            <Input type="text" name="fname" required />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input type="text" name="lname" required />
          </div>

          {error && <h1>{error}</h1>}

          <Button type="submit" className="mt-3">
            Create Account
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col text-sm gap-y-2">
        <FormFooter />
      </CardFooter>
    </Card>
  );
}
