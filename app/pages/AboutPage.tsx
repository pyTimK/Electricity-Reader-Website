import HeaderSettings from "@/components/custom/HeaderSettings";
import { Pages } from "../wrappers/PageWrapper";
import Title from "@/components/custom/Title";
import { Constants } from "@/classes/Constants";
import Logo from "@/components/custom/Logo";
import SizedBox from "@/components/templates/SizedBox";

interface AboutPageProps {}

const AboutPage: React.FC<AboutPageProps> = ({}) => {
  return (
    <div className="flex flex-col px-5 pt-1 h-full text-center items-center">
      {/* //! HEADER */}
      <HeaderSettings title="About" page={Pages.Main} />
      <div className="drop-shadow-lg mt-5 mb-10">
        <Logo size={150} />
      </div>
      <Title />
      <p className="mt-10">{Constants.Description}</p>
    </div>
  );
};

export default AboutPage;
