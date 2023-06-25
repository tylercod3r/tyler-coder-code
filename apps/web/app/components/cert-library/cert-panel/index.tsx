interface IProps {
  cert: any;
}

const CertPanel = (props: IProps) => {
  return (
    <section className="p-5 m-4 border-2 rounded-lg border-slate-900">
      <h3>
        {props.cert.title.toUpperCase()}
      </h3>
      <hr className="border-slate-600"></hr>

      <div>
        {props.cert.keywords?.map((keyword: string) => (
          <p key={keyword} className="text-secondary">
            {keyword.toUpperCase()}
          </p>
        ))}
      </div>

      <div className="p-4">
        <a
          href={props.cert.urlCert}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-20 btn btn-outline"
        >
          view cert
        </a>
      </div>
    </section>
  );
};

export default CertPanel;
