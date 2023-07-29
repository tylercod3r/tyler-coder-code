import { Metadata } from "next";

import AppHeader from "@/app/components/app-header";
import AppFooter from "@/app/components/app-footer";

import "./globals.css";
import LinkLibrary from "@/app/components/link-library";
import { RobotoFont } from "@/app-content/fonts/app-fonts";
import {
  getContentPath,
  getLinkContent,
} from "@/app-content/utils/content-utils";

export const metadata: Metadata = {
  title: "codebycandle.com",
  description:
    "Fullstack software development for web, gaming, & mixed-reality.",
};

function getData() {
  const LINK_CONTENT_DIR_LOCAL: string = "links";

  return {
    links: getLinkContent(getContentPath(LINK_CONTENT_DIR_LOCAL)),
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = getData();

  return (
    <html lang="en" data-theme="my-theme">
      <body
        className={`max-w-2xl py-6 bg-black m-auto ${RobotoFont.variable} font-roboto`}
      >
        <div className="flex flex-col rounded-lg">
          <AppHeader />

          <div className="flex flex-row">
			
            {/* <div className="py-8 rounded-t-lg">
              <LinkLibrary props={data} />
            </div> */}
			
            <div className="w-full py-2 rounded-r-lg border-slate-600">
              {children}
            </div>
          </div>
          <AppFooter />
        </div>
      </body>
    </html>
  );
}
