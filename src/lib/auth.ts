import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = { 
    providers: [
        {
            id: 'infojobs',
            name: 'Infojobs',
            type: 'oauth',
            version: '2.0',
            clientId: process.env.INFOJOBS_CLIENT_ID,
            clientSecret: process.env.INFOJOBS_CLIENT_SECRET,
            checks: ['none'],
            authorization: {
                url: "http://www.infojobs.net/core/oauth2vc/index.xhtml",
                params: {
                    scope: process.env.INFOJOBS_SCOPES,
                    redirect_uri: process.env.INFOJOBS_CALLBACK_URL,
                    response_type: "code",
                },
            },
            token: "http://www.infojobs.net/core/oauth2vc/authorize.xhtml",
            userinfo: "https://api.infojobs.net/api/6/candidate",            
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.photo,
                }
            },
            style: {
                logo: '/infojobs.svg',
                logoDark: '/infojobs.svg',
                bg: '#2088c2',
                text: "#fff",
                bgDark: "#7289DA",
                textDark: "#fff",
            }
        }
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log(user, account, profile, email, credentials);
            return true;
        },
        async jwt({ token }) {
            return token
        },
    }
};