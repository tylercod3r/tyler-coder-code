import { Fragment } from "react";

import path from "path";
import ReactMarkdown from "react-markdown";

import { getAllContent, getContentPath } from "./../../utils/content-utils";
import { TECH_CONTENT_DIR } from "./../../models/content-folders";

// import { CardHeaderFont } from '@/fonts/fonts'

// import styles from './tech-library.module.scss'
import TechPanel from "./tech-panel";

interface IProps {
  techs: any;
}

const TechLibrary = (props: IProps) => {
  return (
    <div className="pt-10 md:pt-8 w-full max-w-2xl mx-auto align-middle flex">
      <div className="w-1/5 mr-2"></div>

      <div className="w-3/5 p-3 mr-4 text-center">
        <h3 className="bg-orange-400">tools</h3>
        {props.techs?.map((tech: any) => (
          <TechPanel key={tech.title} tech={tech} />
        ))}
      </div>
    </div>
  );
};

export default TechLibrary;

export function getStaticProps() {
  return {
    props: {
      techs: getAllContent(getContentPath(TECH_CONTENT_DIR)),
    },
  };
}
