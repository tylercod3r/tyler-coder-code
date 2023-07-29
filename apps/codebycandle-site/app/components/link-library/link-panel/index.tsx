import React from "react";
import Link from 'next/link';
import { SiLinkedin } from "react-icons/si";

import { motion, AnimatePresence } from "framer-motion";

interface IProps {
  link: any;
}

const LinkPanel = (props: IProps) => {
  const Icon = props.link.icon;

  const SomeComponent = () => React.createElement(props.link.icon, {});

  return (
    <motion.li
      key={props.link.url}
      className="select-none card"
      whileHover={{
        position: "relative",
        zIndex: 1,
        background: "black",
        scale: 1.2,
        transition: {
          duration: 0.2,
        },
      }}
    >
      <Link href={props.link.url} passHref legacyBehavior>
       <a target="_blank">{props.link.title.toUpperCase()}</a>
       </Link>
    </motion.li>
  );
};

export default LinkPanel;
