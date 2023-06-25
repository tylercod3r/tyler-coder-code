"use client";

import { motion, AnimatePresence } from "framer-motion";

import ProjectPanel from "./project-panel";

interface IProps {
  projects: any;
}

const ProjectLibrary = (props: { props: IProps }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        {props.props.projects?.map((project: any) => (
          <ProjectPanel key={project.title} project={project} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectLibrary;
