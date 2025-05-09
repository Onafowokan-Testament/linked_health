"use server";

import { lucia, validateRequest } from "@/app/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logout(): Promise<{ error: string }> {
  "use server";
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/login");
}
