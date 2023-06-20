import TechLibrary from "../tool-library";

interface IProps {
  techs: any;
  projects: any;
}

const HomePanel = (props: { props: IProps }) => {
  return (
    <main>
      <div className="flex border-slate-800 text-primary">
        <TechLibrary techs={props.props.techs} />
        {/* <ProjectLibrary projects={props.props.projects} /> */}
        {/* <CertLibrary certs={props.props.certs} /> */}
      </div>
    </main>
  );
}

export default HomePanel;