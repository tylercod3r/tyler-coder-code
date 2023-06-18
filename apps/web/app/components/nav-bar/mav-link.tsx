interface IProps {
  title: string;
  url: string;
}

const NavLink = (props: IProps ) => {
  return (
    <a
      href={props.url}
      className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
      aria-current="page"
    >
      {props.title}
    </a>
  );
};

export default NavLink;
