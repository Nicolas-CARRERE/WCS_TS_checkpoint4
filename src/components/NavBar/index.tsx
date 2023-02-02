import Link from "next/link";
import React from "react";

type Props = {};

function index({}: Props) {
  return (
    <div className="w-screen h-[8vh]  bg-slate-400 fixed top-0">
      <ul className="w-full h-full flex flex-row justify-around items-center text-2xl font-bold">
        <li>
          <Link href="/"> Home </Link>
        </li>
        <li>
          <Link href="/auth/signup">Sign Up</Link>
        </li>
        <li>
          <Link href="/auth/signin">Sign In</Link>
        </li>
        <li>
          <Link href="/users">Users</Link>
        </li>
        <li>
          <Link href="/brands">Brands</Link>
        </li>
        <li>
          <Link href="/models">Models</Link>
        </li>
        <li>
          <Link href="/vehicles">Vehicles</Link>
        </li>
        <li>
          <Link href="/special">Special 🚀</Link>
        </li>
      </ul>
    </div>
  );
}

export default index;
