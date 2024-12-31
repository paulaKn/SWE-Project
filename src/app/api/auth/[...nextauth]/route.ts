// app>api>auth>[...nextauth]>route.ts

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

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
  ],
});

export { handler as GET, handler as POST };