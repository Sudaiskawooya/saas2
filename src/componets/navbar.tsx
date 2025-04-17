import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function navbar() {
  const navitems = [
    {
      name: "home",
      href: "/",
    },
    {
      name: "dashboard",
      href: "/dashboard",
    },
    {
      name: "priceing",
      href: "/",
    },
  ];
  return (
    <div className=" w-full px-4 flex flex-col justify-center items-center couser-pointer">
      <header className=" flex justify-between bag-whiht items-center w-full h-auto p-4 m-4 border-2 border-gray-400 rounded-sm">
        <div className="px-2 bg-blue-600 rounded-sm font-semibold">DOCMAN</div>
        <div className="flex justify-center items-center gap-4">
          {navitems.map((navitem) => (
            <div className="" key={navitem.name}>
              <Link href={navitem.href}>{navitem.name}</Link>
            </div>
          ))}
        </div>
        <div className="text-white">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton showName />
          </SignedIn>
        </div>
      </header>
    </div>
  );
}
