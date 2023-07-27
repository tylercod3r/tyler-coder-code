import {
  getAllContent,
  getContentPath,
} from "@/app-content/utils/content-utils";
import CertLibrary from "../components/cert-library";

function getData() {
  const CERT_CONTENT_DIR_LOCAL: string = "certs";

  return {
    certs: getAllContent(getContentPath(CERT_CONTENT_DIR_LOCAL)),
  };
}

export default async function Page() {
  return <CertLibrary props={getData()} />;
}
