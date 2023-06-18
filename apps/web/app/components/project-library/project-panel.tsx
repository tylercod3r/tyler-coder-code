import Image from "next/image";

interface IProps {
  project: any;
}

function ProjectPanel(props: IProps) {
  const imagePath = `/images/projects/${props.project.image}`;

  return (
    <section className="border-2 border-blue-400">
      <div /*className={styles.keywordItems}*/>
        {props.project.keywords?.map((keyword: string) => (
          <p /*className={KeywordFont.className}*/ key={keyword}>
            {keyword.toUpperCase()}
          </p>
        ))}
      </div>

      <h3 /*className={CardHeaderFont.className}*/>
        {props.project.title.toUpperCase()}
      </h3>

      <div /*className={styles.subKeywordItems}*/>
        {props.project.subKeywords?.map((subKeyword: string) => (
          <p key={subKeyword} /*className={KeywordFont.className}*/>
            {subKeyword.toUpperCase()}
          </p>
        ))}
      </div>

      <br></br>

      <a href={props.project.url} target="_blank" rel="noopener noreferrer">
        <Image
          src={imagePath}
          /*className={styles.projectImage}*/ width="270"
          height="230"
          alt={props.project.title}
        />
      </a>

      <p /*className={CardHeaderFont.className}*/>{props.project.detail}</p>
    </section>
  );
}

export default ProjectPanel;
