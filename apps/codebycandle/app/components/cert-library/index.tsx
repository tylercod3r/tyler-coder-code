"use client";

import { motion, AnimatePresence } from "framer-motion";

import CertPanel from "./cert-panel";

interface IProps {
  certs: any;
}

const CertLibrary = (props: { props: IProps }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        {props.props.certs?.map((cert: any) => (
          <CertPanel key={cert.title} cert={cert} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default CertLibrary;
