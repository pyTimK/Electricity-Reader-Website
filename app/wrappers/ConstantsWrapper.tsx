import { Dispatch, SetStateAction, createContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import LoadingPage from "../pages_outer/LoadingPage";
import FHWrapper from "./FHWrapper";

//? ----------------------
//? LOADING PAGE
//? TOAST
//? ----------------------

export class LoadingCondition {
  message: string;
  condition: boolean;

  constructor(message: string, condition: boolean) {
    this.message = message;
    this.condition = condition;
  }
}

export const LoadingContext = createContext({
  loading: false,
  setLoading: {} as Dispatch<SetStateAction<boolean>>,
});

interface ConstantsWrapperProps {}

const ConstantsWrapper: React.FC<ConstantsWrapperProps> = ({}) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {/* //! FH WRAPPER PAGE */}
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <FHWrapper />
      </LoadingContext.Provider>

      {/* //! LOADING PAGE */}
      {loading && <LoadingPage />}

      {/* //! TOAST */}
      <ToastContainer
        className="toast-custom"
        theme="colored"
        autoClose={2000}
        closeButton={false}
      />
    </>
  );
};

export default ConstantsWrapper;
