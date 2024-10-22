import UserButton from "@/components/UserButton";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-10  bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap item-center justify-center gap-5 px-5 py-3">
        <Link href={"/"} className="text-2xl font-bold text-primary">
          LinkedHealth
        </Link>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
