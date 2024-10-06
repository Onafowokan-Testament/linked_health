import { Metadata } from "next";
import Image from "next/image";
import login from "../../assets/hero2.jpeg";
import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login page",
};

const page = () => {
  return (
    <div className="flex h-screen items-center justify-center p-5 ">
      <div className="flex rounded-2xl w-full h-full max-h-[40rem] max-w-[64rem] overflow-hidden shadow-2xl bg-card">
        <div className=" w-1/2 md:w-1/2 p-10 overflow-y-auto space-y-10">
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold">Login to LinkedHealth </h1>
            <p className="text-muted-foreground">
              A place where <span className="italic">medicals </span> connect
            </p>
          </div>
          <div className="space-y-5">
            <LoginForm />
            <Link href="/signup" className="block hover:underline text-center">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>

        <Image
          alt=""
          src={login}
          className="w-1/2 hidden md:block rounded-sm h-full object-cover"
        />
      </div>
    </div>
  );
};

export default page;
