import { Session } from "next-auth";
import { headers } from "next/headers";
import { Montserrat } from "next/font/google";
import AuthContext from "@/app/AuthContext";
import Header from "../components/Header";

export const metadata = {
  title: "Home - CvCheckr",
  description: "Check your CVs and get a score!",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get("cookie") ?? "");
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthContext session={session}>
          <Header />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
