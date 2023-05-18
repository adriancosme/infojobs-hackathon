import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/',
        signOut: '/',        
    },
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
                url: process.env.INFOJOBS_AUTH_URL,
                params: {
                    scope: process.env.INFOJOBS_SCOPES,
                    redirect_uri: process.env.INFOJOBS_CALLBACK_URL,
                    response_type: "code",
                },
            },
            token: {
                url: process.env.INFOJOBS_AUTHORIZATION_URL,
                async request({ params }) {                    
                    const tokenUrl = new URL(process.env.INFOJOBS_AUTHORIZATION_URL ?? '');
                    tokenUrl.searchParams.append('grant_type', 'authorization_code');
                    tokenUrl.searchParams.append('code', params.code ?? '');
                    tokenUrl.searchParams.append('redirect_uri', process.env.INFOJOBS_CALLBACK_URL ?? '');
                    tokenUrl.searchParams.append('client_id', process.env.INFOJOBS_CLIENT_ID ?? '');
                    tokenUrl.searchParams.append('client_secret', process.env.INFOJOBS_CLIENT_SECRET ?? '');
                    const response = await fetch(tokenUrl.toString(), {
                        method: 'POST',
                    })
                    const tokens = await response.json();
                    return {
                        tokens
                    }
                }
            },
            userinfo: {
                url: process.env.INFOJOBS_USERINFO_URL,
                async request({ tokens }) {
                    const basicToken = `Basic ${Buffer.from(`${process.env.INFOJOBS_CLIENT_ID}:${process.env.INFOJOBS_CLIENT_SECRET}`).toString('base64')}`;
                    const bearerToken = `Bearer ${tokens.access_token}`;
                    const response = await fetch(process.env.INFOJOBS_USERINFO_URL ?? '', {
                        headers: {
                            Authorization: `${basicToken},${bearerToken}`,
                        },
                    });
                    const profile = await response.json();
                    return {
                        id: profile.id,
                        email: profile.email,
                        image: profile.photo,
                        name: profile.name,
                        sub: profile.id,
                    }
                }
            },
            profile(profile) {
                console.log('profile', profile);
                return {
                    id: profile.id,
                    name: profile.name,
                    surname1: profile.surname1,
                    surname2: profile.surname2,
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
            console.log('jwt', token);
            return token
        },
    },
    debug: false,
};