import CertPanel from "./cert-panel";

interface IProps {
  certs: any;
}

const CertLibrary = (props:{props: IProps}) => {
  return (
    <div>
      {props.props.certs?.map((cert: any) => (
        <CertPanel key={cert.title} cert={cert} />
      ))}
    </div>
  );
};

export default CertLibrary;