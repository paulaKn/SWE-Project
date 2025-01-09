// app>api>auth>[...nextauth]>route.ts
import { User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "credentials",
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Benutzername", type: "text" },
        password: { label: "Passwort", type: "password" },
      },
      async authorize(credentials) {
        if (
            credentials?.username === "admin" &&
            credentials?.password === "1234"
          ) {
            return { id: "1", name: "Admin User", email: "admin@example.com" };
          }
          throw new Error("Ungültige Anmeldedaten!");
      },
    }),
    CredentialsProvider({
      id: "credentialsAdmin",
      name: "Credentials",
      credentials: {
        username: { label: "Benutzername", type: "text" },
        password: { label: "Passwort", type: "password" },
      },
      async authorize(credentials) {
        // check if the credentials are valid
        if (
            !(credentials?.username === "admin") ||
            !(credentials?.password === "p")
          ) throw new Error("Ungültige Anmeldedaten!");
        const user = { id: "1", name: "admin", email: "admin@example.com", accessToken: "", expiresIn: 1800, refreshToken: "", refreshExpiresIn: 3600};

        if (user) {
          // GraphQL query to fetch the token
          const query = `
          mutation {
            token(username: "${credentials?.username}", password: "${credentials?.password}") {
              access_token
              expires_in
              refresh_token
              refresh_expires_in
            }
          }
          `;

          // fetch the token from the GraphQL endpoint
          const response = await fetch("https://localhost:3000/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
            cache: "no-store",
          });

          if (!response.ok) {
            throw new Error("Failed to fetch GraphQL data");
          }

          // get the token from the response
          const data = await response.json();

          // set the token for the user
          user.accessToken = data.data.token.access_token;
          user.expiresIn = data.data.token.expires_in;
          user.refreshToken = data.data.token.refresh_token;
          user.refreshExpiresIn = data.data.token.refresh_expires_in;

          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      
      // set the token for the user
      if (user) {
        // custom User Type from next-auth to access the user properties
        const customUser = user as User;
        token.id = customUser.id;
        token.accessToken = customUser.accessToken;
        token.refreshToken = customUser.refreshToken;
        token.expiresIn = Math.floor(Date.now() / 1000) + customUser.expiresIn;
        token.refreshExpiresIn = Math.floor(Date.now() / 1000) + customUser.refreshExpiresIn;
      }
      // delete the exp property from the token
      delete token.exp;
      return token;
    },

    // set the session for the user
    async session({ session, token }) {
      // set the session for the user
      
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          expiresIn: token.expiresIn,
          refreshExpiresIn: token.refreshExpiresIn,
        }
      }
    },
  }

});

export { handler as GET, handler as POST };