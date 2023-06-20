import Image from "next/image";

interface IProps {
  project: any;
}

const ProjectPanel = (props: IProps) => {
  const imagePath = `/images/projects/${props.project.image}`;

  return (
    <section className="p-5 m-4 border-2 rounded-r-lg border-slate-600">
      <h3>{props.project.title.toUpperCase()}</h3>

      <div>
        {props.project.keywords?.map((keyword: string) => (
          <p key={keyword} className="text-secondary">
            {keyword.toUpperCase()}
          </p>
        ))}
      </div>

      <div className="text-slate-400">
        {props.project.subKeywords?.map((subKeyword: string) => (
          <p key={subKeyword}>{subKeyword.toUpperCase()}</p>
        ))}
      </div>

      <a
        className="px-3 shadow-lg"
        href={props.project.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className="rounded-lg shadow-lg"
          src={imagePath}
          width="270"
          height="230"
          alt={props.project.title}
        />
      </a>

      <p>{props.project.detail}</p>
    </section>
  );
};

export default ProjectPanel;
