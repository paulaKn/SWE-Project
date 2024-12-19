import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import Header from "@/components/Header/header";


export const metadata: Metadata = {
  title: "Buecherei",
  description: "Buecher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
