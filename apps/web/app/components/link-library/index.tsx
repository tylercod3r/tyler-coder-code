import LinkPanel from "./link-panel";

interface IProps {
  links: any;
}

interface IPropsLink {
  title: string;
  url: string;
}

const LinkLibrary = (props: { props: IProps }) => {
  return (
    <div className="border-red-800">
      <ul className="px-4 space-y-12 text-blue-200">
        {props.props.links?.map((link: IPropsLink) => (
          <LinkPanel key={link.title} link={link} />
        ))}
      </ul>
    </div>
  );
};

export default LinkLibrary;
