import Modal from "react-modal";
import MyButton from "./MyButton";
import { twMerge } from "tailwind-merge";
import CrossCircleIcon from "../svg/icon/CrossCircleIcon";
import { jsoFont } from "@/styles/fonts";
import useModal from "@/hooks/useModal";

interface MyModalProps {
  useModal: ReturnType<typeof useModal>;
  title: string;
  children: React.ReactNode;
  height?: string;
  width?: string;
  className?: string;
  classNameInner?: string;
  classNameContent?: string;
  hideLine?: boolean;
}

const MyModal: React.FC<MyModalProps> = ({
  useModal,
  title,
  children,
  height,
  width,
  className,
  classNameInner,
  classNameContent,
  hideLine = false,
}) => {
  return (
    <Modal
      isOpen={useModal.isOpen}
      ariaHideApp={false}
      className={twMerge(" inset-0 text-zinc-600", className, jsoFont)}
      onRequestClose={useModal.close}
      // style={customStyles}
    >
      {/* MAIN CONTENT */}
      <div
        className={twMerge(
          "absolute w-72 drop-shadow-lg shadow-lg bg-white rounded-xl left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2",
          classNameContent
        )}
      >
        <div className="bg-darker_primary rounded-t-xl py-2">
          <p className="text-2xl font-bold text-center text-white text-smooth_black">
            {title}
          </p>
        </div>
        <div className="py-5 px-3">{children}</div>
      </div>
    </Modal>
  );
};

export default MyModal;
