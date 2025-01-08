//import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { getServerSession } from "next-auth/next";
import SessionProvider from "@/components/SessionProvider";




/*export const metadata: Metadata = {
  title: "Buecherei",
  description: "Buecher",
};*/

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <SessionProvider session={session}>
            <main>{children}</main>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
