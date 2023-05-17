import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };