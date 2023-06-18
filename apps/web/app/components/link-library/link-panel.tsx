interface IProps {
  link: any;
}

function LinkPanel(props: IProps) {
  return (
    <section>
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
