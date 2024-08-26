"use server";

import { signIn, signOut } from "@/auth";

export async function logout() {
  try {
    await signOut();
    return {
      message: "Signout success",
      status: true,
    };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Unknown error",
      status: false,
    };
  }
}

export async function github() {
  console.log(process.env.GITHUB_CLIENT_SECRET);
  await signIn("github");
}
