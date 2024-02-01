import { FHContext } from "@/app/wrappers/FHWrapper";
import { PageWrapperContext, Pages } from "@/app/wrappers/PageWrapper";
import { useContext } from "react";
import AboutIcon from "../svg/icon/AboutIcon";
import Avatar from "../templates/Avatar";
import Title from "./Title";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const { myUser } = useContext(FHContext);
  const { setPage } = useContext(PageWrapperContext);
  return (
    <div className="fixed w-full h-10 bg-white z-10 flex items-center justify-between px-5 py-8 rounded-b-3xl shadow">
      <AboutIcon onClick={() => setPage(Pages.About)} />
      <Title size={85} />
      <Avatar
        src={myUser?.photoURL}
        size={40}
        onClick={() => setPage(Pages.Profile)}
      />
    </div>
  );
};

export default Header;
