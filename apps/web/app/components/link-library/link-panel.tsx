interface IProps {
  link: any;
}

function LinkPanel(props: IProps) {
  return (
    <section className="border-2 border-blue-400">
      <a
        className="px-0"
        href={props.link.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>{props.link.title.toUpperCase()}</h2>
      </a>
    </section>
  );
}

export default LinkPanel;
