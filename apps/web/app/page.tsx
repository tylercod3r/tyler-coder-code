import HomePanel from "@/app/components/home-panel";
import {
  getAllContent,
  getContentPath,
} from "@/app-content/utils/content-utils";

function getData() {
  const PROJECT_CONTENT_DIR_LOCAL: string = "projects";
  const CERT_CONTENT_DIR_LOCAL: string = "certs";
  const TECH_CONTENT_DIR_LOCAL: string = "techs";

  return {
    projects: getAllContent(getContentPath(PROJECT_CONTENT_DIR_LOCAL)),
    certs: getAllContent(getContentPath(CERT_CONTENT_DIR_LOCAL)),
    techs: getAllContent(getContentPath(TECH_CONTENT_DIR_LOCAL)),
  };
}

export default async function Page() {
  return <HomePanel props={getData()} />;
}
