/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@/auth";
import ratelimit from "@/lib/ratelimit";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUp = async (params: {
  email: string;
  fullName: string;
  password: string;
  universityCard: string;
  universityId: number;
}) => {
  const { email, fullName, password, universityCard, universityId } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip)

  if(!success) return redirect("/too-fast")

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: fullName,
        fullName,
        universityCard,
        universityId,
        status: "PENDING",
        role: "USER",
      },
    });

    return { success: true, data: result };
  } catch (error: any) {
    console.error("Sign Up Error:", error);

    return {
      success: false,
      error: error?.message ?? "Sign Up Error",
    };
  }
};

export const signIn = async (params: {
  email: string;
  password: string;
}) => {
  const { email, password } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip)

  if(!success) return redirect("/too-fast")

  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { success: true, data: result };
  } catch (error: any) {
    console.error("Sign In Error:", error);

    return {
      success: false,
      error: error?.message ?? "Invalid email or password",
    };
  }
};