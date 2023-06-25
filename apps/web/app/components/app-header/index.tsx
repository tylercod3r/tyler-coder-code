"use client";

import { PromptFont, MonserratFont } from "@/app-content/fonts/app-fonts";
import NavBar from "../nav-bar";

import { siteTitle, siteDescription } from "@/app-content/models/site-text";
import { motion, AnimatePresence } from "framer-motion";

const AppHeader = () => {
  return (
    <header className="p-1 shadow">
      {/* <div className="flex w-full max-w-2xl pt-10 mx-auto align-middle md:pt-8"> */}
      <div className="w-1/5 mr-2 ml-36">
        <AnimatePresence>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
                y: -45,
              },
              visible: {
                scale: 2,
                opacity: 1,
                y: 0,
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
        </AnimatePresence>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ delay: 1.5, duration: 2 }}
            className="flex m-auto border-slate-800 text-primary"
          >
            <h2
              className={`text-slate-400 overflow-visible whitespace-nowrap py-3 ${MonserratFont.variable} font-monserrat`}
            >
              {siteDescription}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      <NavBar />
    </header>
  );
};

export default AppHeader;
