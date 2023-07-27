'use client'

import LinkPanel from "./link-panel";

import { motion, AnimatePresence } from "framer-motion";


interface IProps {
  links: any;
}

interface IPropsLink {
  title: string;
  url: string;
}

const LinkLibrary = (props: { props: IProps }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <ul className="px-4 space-y-12 text-blue-200">
          {props.props.links?.map((link: IPropsLink) => (
            <LinkPanel key={link.title} link={link} />
          ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

export default LinkLibrary;
