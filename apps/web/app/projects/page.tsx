import {
  getAllContent,
  getContentPath,
} from "@/app-content/utils/content-utils";
import ProjectLibrary from "../components/project-library";

function getData() {
  const PROJECT_CONTENT_DIR_LOCAL: string = "projects";

  return {
    projects: getAllContent(getContentPath(PROJECT_CONTENT_DIR_LOCAL)),
  };
}

export default async function Page() {
  return <ProjectLibrary props={getData()} />;
}