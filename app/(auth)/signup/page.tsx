import { Metadata } from "next";
import React from "react";
import signup_image from "../../assets/hero2.jpeg";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Sign up",
};

const page = () => {
  return (
    <main className="flex h-screen  items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] rounded-2xl overflow-hidden bg-card shadow-2xl">
        <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Sign up to LinkedHealth </h1>
            <p className="text-muted-foreground">
              {" "}
              A place where <span className="italic">medicals </span> connect
            </p>
          </div>

          <div className="space-y-5">
            <SignUpForm />
            <Link href="/login" className="block text-center hover:underline">
              Already have an account? Log in
            </Link>
          </div>
        </div>

        <Image
          src={signup_image}
          alt=""
          className="hidden md:block w-1/2 object-cover"
        />
      </div>
    </main>
  );
};

export default page;
