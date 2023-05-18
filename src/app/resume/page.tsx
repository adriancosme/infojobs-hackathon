"use client";
import { signOut, useSession } from "next-auth/react";

export default function ResumePage() {
  const { data } = useSession();
  return (
    <div className="container-wrapper mt-4 w-full m-auto">
      <h1>Protected page</h1>
      <h2>{data?.user?.name}</h2>
      <h3>{data?.user?.email}</h3>
    </div>
  );
}
