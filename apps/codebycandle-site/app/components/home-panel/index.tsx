"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TechLibrary from "../tool-library";

interface IProps {
  techs: any;
  projects: any;
}

const HomePanel = (props: { props: IProps }) => {
  return (
    <main>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ delay: 0.5 }}
          className="flex m-auto border-slate-800 text-primary"
        >
          <Image
            className="rounded-lg"
            alt="yop"
            src="/images/about-page/slider-01.jpg"
            width={400}
            height={400}
          />
          <TechLibrary techs={props.props.techs} />
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default HomePanel;
