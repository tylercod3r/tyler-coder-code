import TechPanel from "./tool-panel";

interface IProps {
  techs: any;
}

const ToolLibrary = (props: IProps) => {
  return (
    <div className="flex items-center justify-center w-full max-w-2xl pt-10 mx-auto align-middle md:pt-8">
      <div className="w-3/5 p-3 mr-4 text-center text-slate-400">
        <h3 className="text-white rounded-t bg-slate-900 text-backgroundColorTest">tools</h3>
        {props.techs?.map((tech: any) => (
          <TechPanel key={tech.title} tech={tech} />
        ))}
      </div>
    </div>
  );
};

export default ToolLibrary;
