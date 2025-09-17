"use client";

import { emailSignIn } from "@/lib/server/sign-in";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

export default function EmailSignIn({ callbackUrl }: { callbackUrl?: string }) {
  const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <form
      className="flex items-center mt-4"
      onSubmit={(e) => {
        e.preventDefault();

        setButtonLoading(true);

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
        disabled={buttonLoading}
      />
      <Button
        className="max-w-sm rounded-l-none"
        type="submit"
        disabled={buttonLoading}
      >
        {buttonLoading ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}
