"use server";

import { signIn } from "@/auth";

export async function emailSignIn(email: string, callbackUrl?: string) {
  await signIn("credentials", { email, redirect: true, redirectTo: callbackUrl });
}
