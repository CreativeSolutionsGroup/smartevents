"use client";
import { signIn } from "next-auth/react";
import MicrosoftIcon from "./microsoft-icon";

export default function SignInButton({
  callbackUrl,
}: {
  callbackUrl?: string;
}) {
  return (
    <button
      onClick={() =>
        signIn("microsoft-entra-id", { callbackUrl: callbackUrl ?? "/" })
      }
    >
      <MicrosoftIcon />
    </button>
  );
}
