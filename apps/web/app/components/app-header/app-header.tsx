import NavLink from "../nav-bar/mav-link";
import { HeaderFont, SubHeaderFont } from "@/app/fonts/app-fonts";
import NavBar from "../nav-bar/nav-bar";

interface IProps {
  links: any;
}

interface IPropsLink {
  title: string;
  url: string;
}

// const NavData = {
//   title: "test",
//   url: "/",
// };

const AppHeader = (props: { props: IProps }) => {
  return (
    <header className="p-1 bg-black shadow">
      <div className="pt-10 md:pt-8 w-full max-w-2xl mx-auto align-middle flex">
        <div className="w-1/5 mr-2">
          <h1 className={HeaderFont.className}>tyler coder</h1>
          {/* <h2 className={SubHeaderFont.className}>
            Fullstack software development for web, gaming, & mixed-reality.
          </h2> */}
        </div>

          <NavBar/>


        {/* 
        <div className="w-1/5 p-3 mr-2"></div> */}
      </div>
    </header>
  );
};

export default AppHeader;
