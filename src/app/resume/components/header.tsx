"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function HeaderComponent() {
  const logoutHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    signOut();
  };

  return (
    <header>
      <div className="px-10 py-5 bg-white shadow-sm w-full box-border mx-auto block">
        <div className="flex relative items-center h-10">
          <Link href="/resume" className="flex-shrink justify-items-start whitespace-nowrap overflow-hidden mr-4">
            CvCheckr
          </Link>
          <nav className="flex-grow">
            <ul className="flex">
              <li>
                <Link href="/resume">CV</Link>
              </li>
            </ul>
          </nav>
          <button className="flex-grow-0" onClick={logoutHandler}>Logout</button>
        </div>
      </div>
    </header>
  );
}
