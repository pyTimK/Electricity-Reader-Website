import { Dispatch, SetStateAction, createContext, useState } from "react";
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import AboutPage from "../pages/AboutPage";

//? ----------------------
//? PAGES
//? BOTTOM SHEETS
//? ----------------------

export const enum Pages {
  Main,
  Profile,
  About,
}

export const PageWrapperContext = createContext({
  page: Pages.Main,
  setPage: {} as Dispatch<SetStateAction<Pages>>,
  howMuch: 0,
  setHowMuch: {} as Dispatch<SetStateAction<number>>,
});

interface PageWrapperProps {}

const PageWrapper: React.FC<PageWrapperProps> = ({}) => {
  //! Gcash HOW MUCH
  const [howMuch, setHowMuch] = useState(0);
  //! Page
  const [page, setPage] = useState<Pages>(Pages.Main);

  return (
    <PageWrapperContext.Provider
      value={{
        page,
        setPage,
        howMuch,
        setHowMuch,
      }}
    >
      <div className="w-full h-full">
        {page === Pages.Main && <MainPage />}
        {page === Pages.Profile && <ProfilePage />}
        {page === Pages.About && <AboutPage />}
      </div>
    </PageWrapperContext.Provider>
  );
};

export default PageWrapper;
