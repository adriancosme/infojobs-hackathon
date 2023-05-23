import InfojobsProvider from "infojobs-next-auth-provider";
import { NextAuthOptions } from "next-auth";
export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/',
        signOut: '/',
    },
    providers: [
        InfojobsProvider({
            clientId: process.env.INFOJOBS_CLIENT_ID ?? "",
            clientSecret: process.env.INFOJOBS_CLIENT_SECRET ?? "",
            infojobs_scopes: process.env.INFOJOBS_SCOPES ?? "",
            redirect_uri: process.env.INFOJOBS_CALLBACK_URL ?? "",
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            return session;
        },
    },
    debug: false,
};