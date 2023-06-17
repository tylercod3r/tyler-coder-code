import { Metadata } from "next";

import AppHeader from "./components/app-header/app-header";
import AppFooter from "./components/app-footer/app-footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "tylercoder.com",
  description:
    "Fullstack software development for web, gaming, & mixed-reality.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <head>
        <title>Next Layout Example</title>
      </head> */}
      <body className="bg-zinc-900 text-zinc-200">
       <div className="flex flex-col border-2 border-green-500 v-screen">
          <AppHeader />
          <div className="border-2 border-yellow-400">{children}</div>
          <AppFooter />
          </div>
      </body>
    </html>
  );
}
