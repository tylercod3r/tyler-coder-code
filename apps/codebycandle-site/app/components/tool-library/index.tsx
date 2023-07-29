import TechPanel from "./tool-panel";

interface IProps {
  techs: any;
}

const ToolLibrary = (props: IProps) => {
  return (
    <div className="flex items-center justify-center max-w-2xl pt-10 mx-auto align-middle md:pt-8">
      <div className="w-3/5 p-3 mr-4 text-secondary">
        <h3 className="text-white rounded-t text-backgroundColorTest">tools</h3>
        <hr className="border-slate-600"></hr>
        {props.techs?.map((tech: any) => (
          <TechPanel key={tech.title} tech={tech} />
        ))}
      </div>
    </div>
  );
};

export default ToolLibrary;
