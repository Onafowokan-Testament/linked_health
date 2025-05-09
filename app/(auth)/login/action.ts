"use server";

import prisma from "@/lib/prisma";
import { LoginValue, LoginSchema } from "./../../../lib/validation";
import { verify } from "@node-rs/argon2";

import { isRedirectError } from "next/dist/client/components/redirect";
import { lucia } from "@/app/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  credentials: LoginValue
): Promise<{ error: string }> {
  try {
    const { email, password } = LoginSchema.parse(credentials);

    const existingUser = await prisma.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
    });

    if (!existingUser || !existingUser.passwordHash) {
      return {
        error: "Incorrect username or password",
      };
    }

    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    if (!validPassword) {
      return {
        error: "Incorrect username or password",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { error: "An error occured, try again" };
  }
}
