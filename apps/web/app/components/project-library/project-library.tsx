import ProjectPanel from "./project-panel";

interface IProps {
  projects: any;
}

const ProjectLibrary = (props: IProps) => {
  return (
    <div /*className={styles.mainDiv}*/>
      <h3 className="bg-orange-400">projects</h3>
      {props.projects?.map((project: any) => (
        <ProjectPanel key={project.title} project={project} />
      ))}
    </div>
  );
};

export default ProjectLibrary;
