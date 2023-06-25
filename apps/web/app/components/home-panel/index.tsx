'use client'

import { motion, AnimatePresence } from "framer-motion";

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
          transition={{ delay: 0.25 }}
          className="flex border-slate-800 text-primary"
        >
          <TechLibrary techs={props.props.techs} />
          {/* <ProjectLibrary projects={props.props.projects} /> */}
          {/* <CertLibrary certs={props.props.certs} /> */}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default HomePanel;
