import NextAuth, { AuthOptions } from "next-auth"
export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    {
      id: 'infojobs',
      name: 'Infojobs',
      type: 'oauth',
      version: '2.0',
      clientId: process.env.INFOJOBS_CLIENT_ID,
      clientSecret: process.env.INFOJOBS_CLIENT_SECRET,
      authorization: {
        url: "http://www.infojobs.net/core/oauth2vc/index.xhtml",
        params: {
          scope: process.env.INFOJOBS_SCOPES,
          redirect_uri: process.env.INFOJOBS_CALLBACK_URL,
          response_type: "code",
        },
      },
      token: "http://www.infojobs.net/core/oauth2vc/authorize.xhtml",
      userinfo: {
        url: "https://api.infojobs.net/api/6/candidate",
        async request({ client, tokens }) {
          const profile = await client.userinfo(tokens.access_token!)
          return profile;
        }
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.photo,
        }
      },
      style: {
        logo: './infojobs.svg',
        logoDark: './infojobs.svg',
        bg: '#2088c2',
        text: "#fff",
        bgDark: "#7289DA",
        textDark: "#fff",
      }
    }
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {

    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, account, profile, email, credentials);
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      console.log(token, account, profile);
      // if (account) {
      //   token.accessToken = account.access_token
      //   token.id = profile.id
      // }
      return token
    }
  }
}
export default NextAuth(authOptions)