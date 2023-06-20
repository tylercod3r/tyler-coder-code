"use client";

import { PromptFont, MonserratFont } from "@/app-content/fonts/app-fonts";
import NavBar from "../nav-bar";

import { siteTitle, siteDescription } from "@/app-content/models/site-text";
import { motion } from "framer-motion";

const AppHeader = () => {
  return (
    
    <header className="p-1 shadow">
      {/* <div className="flex w-full max-w-2xl pt-10 mx-auto align-middle md:pt-8"> */}
        <div className="w-1/5 mr-2 ml-36">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
              },
              visible: {
                scale: 2,
                opacity: 1,
                transition: {
                  delay: 0.4,
                },
              },
            }}
          >
            <h1 className={`${PromptFont.variable} font-prompt text-secondary`}>
              {siteTitle.toLowerCase()}
            </h1>
          </motion.div>
          {/* <h2 className={`${MonserratFont.variable} font-monserrat`}>
            {siteDescription}
          </h2> */}
        </div>

        <NavBar />
    </header>
  );
};

export default AppHeader;
