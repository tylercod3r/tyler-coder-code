import { Fragment } from "react";

import path from "path";
import ReactMarkdown from "react-markdown";

import { getAllContent, getContentPath } from "./../../utils/content-utils";
import LinkPanel from "./link-panel";
import { LINK_CONTENT_DIR } from "./../../models/content-folders";

// import styles from './link-library.module.scss'

interface IProps {
  links: any;
}

interface IPropsLink {
  title: string;
  url: string;
}

const LinkLibrary = (props: { props: IProps }) => {
  return (
    <div className="">
      {props.props.links?.map((link: IPropsLink) => (
        <LinkPanel key={link.title} link={link} />
      ))}
    </div>
  );
};

// export function getStaticProps(){
//     return ({
//         props: {
//             links: getAllContent(getContentPath(LINK_CONTENT_DIR))
//         }
//     })
// }

export default LinkLibrary;
