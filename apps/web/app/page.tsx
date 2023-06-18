// import { Button, Header } from "ui";

import HomePage from "./pages/home-page/home-page";
import {
  getAllContent,
  getLinkContent,
  getContentPath,
} from "./utils/content-utils";

function getData() {
  // TODO - confirm why these need to be defined locally (as otherwise 'undefined')
  const LINK_CONTENT_DIR_LOCAL: string = "links";
  const PROJECT_CONTENT_DIR_LOCAL: string = "projects";
  const CERT_CONTENT_DIR_LOCAL: string = "certs";
  const TECH_CONTENT_DIR_LOCAL: string = "techs";

  return {
    projects: getAllContent(getContentPath(PROJECT_CONTENT_DIR_LOCAL)),
    certs: getAllContent(getContentPath(CERT_CONTENT_DIR_LOCAL)),
    links: getLinkContent(getContentPath(LINK_CONTENT_DIR_LOCAL)),
    techs: getAllContent(getContentPath(TECH_CONTENT_DIR_LOCAL)),
  };
}

export default async function Page() {
  const data = getData();

  return <HomePage props={data} />;
}
