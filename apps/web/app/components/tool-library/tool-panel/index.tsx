import Link from "next/link";

interface IProps {
  tech: any;
}

const ToolPanel = (props: IProps) => {
  return (
    <section className="border-2 border-slate-800">
      <div /*className={styles.keywordItems}*/>
        {props.tech.keywords?.map((keyword: string) => (
          <p key={keyword} /*className={KeywordFont.className}*/>
            {keyword.toUpperCase()}
          </p>
        ))}
      </div>

      <div /*className={styles.linkButtons}*/>
        <Link href={props.tech.url}>{props.tech.title}</Link>
      </div>
    </section>
  );
};

export default ToolPanel;
