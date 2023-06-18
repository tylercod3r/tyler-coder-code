import { Metadata } from "next";

import AppHeader from "./components/app-header/app-header";
import AppFooter from "./components/app-footer/app-footer";

import "./globals.css";
import {
  getAllContent,
  getContentPath,
  getLinkContent,
} from "./utils/content-utils";
import LinkLibrary from "./components/link-library/link-library";

export const metadata: Metadata = {
  title: "tylercoder.com",
  description:
    "Fullstack software development for web, gaming, & mixed-reality.",
};

interface IPropsLink {
  title: string;
  url: string;
}

function getData() {
  // TODO - confirm why these need to be defined locally (as otherwise 'undefined')
  const LINK_CONTENT_DIR_LOCAL: string = "links";
  const PROJECT_CONTENT_DIR_LOCAL: string = "projects";
  const CERT_CONTENT_DIR_LOCAL: string = "certs";
  const TECH_CONTENT_DIR_LOCAL: string = "techs";

  return {
    // projects: getAllContent(getContentPath(PROJECT_CONTENT_DIR_LOCAL)),
    // certs: getAllContent(getContentPath(CERT_CONTENT_DIR_LOCAL)),
    links: getLinkContent(getContentPath(LINK_CONTENT_DIR_LOCAL)),
    // techs: getAllContent(getContentPath(TECH_CONTENT_DIR_LOCAL)),
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = getData();
  {
    // {
    //   console.log("link count: " + data.links[0].slug);
    // }
  }

  return (
    <html lang="en">
      {/* <head>
        <title>Next Layout Example</title>
      </head> */}
      <body className="bg-zinc-900 text-zinc-200">
        <div className="flex flex-col">
          <AppHeader props={data} />
 
          <div className="flex flex-row">
            <div className="border-2 border-red-800 py-8 bg-red-800">
              <LinkLibrary props={data} />
            </div>

            <div className="border-2 border-blue-800 py-2 bg-blue-800 w-full">
              {children}
            </div>
          </div>
          <AppFooter />
        </div>
      </body>
    </html>
  );
}
