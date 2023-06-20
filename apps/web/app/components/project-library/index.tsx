import ProjectPanel from "./project-panel";

interface IProps {
  projects: any;
}

const ProjectLibrary = (props:{props: IProps}) => {
  return (
    <div>
      {props.props.projects?.map((project: any) => (
        <ProjectPanel key={project.title} project={project} />
      ))}
    </div>
  );
};

export default ProjectLibrary;
