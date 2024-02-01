import { PageWrapperContext, Pages } from "@/app/wrappers/PageWrapper";
import { useContext } from "react";
import BackAndroidIcon from "../svg/icon/BackAndroidIcon";

interface HeaderSettingsProps {
  title: string;
  page?: Pages;
  onClick?: () => void;
}

const HeaderSettings: React.FC<HeaderSettingsProps> = ({
  title,
  page,
  onClick,
}) => {
  const { setPage } = useContext(PageWrapperContext);
  return (
    <div className="w-full h-20">
      <div className=" w-full flex justify-between items-center">
        <BackAndroidIcon
          size={25}
          onClick={() => {
            if (onClick) {
              onClick();
            }
            if (page !== undefined) {
              setPage(page);
            }
          }}
        />
        <p className="font-semibold">{title}</p>
        <BackAndroidIcon size={25} hidden />
      </div>
    </div>
  );
};

export default HeaderSettings;
