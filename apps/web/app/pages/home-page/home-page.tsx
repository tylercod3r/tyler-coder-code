"use client";

import CertLibrary from "../../components/cert-library/cert-library";
import ProjectLibrary from "../../components/project-library/project-library";
import TechLibrary from "../../components/tech-library/tech-library";

interface IProps {
  techs: any;
  projects: any;
}

export default function HomePage(props: { props: IProps }) {
  return (
    <main /*className={styles.main}*/>
      {/* <div className={styles.description}>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div> */}

      {/* <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div> */}

      <div className="flex">
        <TechLibrary techs={props.props.techs} />
        {/* <ProjectLibrary projects={props.props.projects} /> */}
        {/* <CertLibrary certs={props.props.certs} /> */}
      </div>
    </main>
  );
}
