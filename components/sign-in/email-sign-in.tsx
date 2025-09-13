"use client";

import { emailSignIn } from "@/lib/server/sign-in";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function EmailSignIn({ callbackUrl }: { callbackUrl: string }) {
  return (
    <form
      className="flex items-center mt-4"
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        emailSignIn(email, callbackUrl);
      }}
    >
      <Input
        type="email"
        name="email"
        id="email"
        required
        placeholder="yourname@cedarville.edu"
        className="max-w-sm rounded-r-none"
      />
      <Button className="max-w-sm rounded-l-none" type="submit">
        Sign In
      </Button>
    </form>
  );
}
