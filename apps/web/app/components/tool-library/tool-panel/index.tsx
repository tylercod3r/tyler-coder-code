import Link from "next/link";

interface IProps {
  tech: any;
}

const ToolPanel = (props: IProps) => {
  return (
    <section className="py-2 border-slate-600">
      <div /*className={styles.keywordItems}*/>
        {props.tech.keywords?.map((keyword: string) => (
          <p key={keyword} className="text-slate-700">
            {keyword.toUpperCase()}
          </p>
        ))}
      </div>

      <div className="text-slate-300">
        <Link href={props.tech.url}>{props.tech.title}</Link>
      </div>
    </section>
  );
};

export default ToolPanel;
