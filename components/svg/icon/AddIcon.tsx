import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface AddIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
}

const AddIcon: React.FC<AddIconProps> = ({ onClick, size = 35 }) => (
  <motion.svg
    onClick={onClick}
    className="cursor-pointer"
    whileTap={{ scale: 0.8 }}
    width={size}
    viewBox="0 0 58 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="28.9999" cy="29.1516" r="28.6616" fill="#EB1C36" />
    <path
      d="M29 41.9612V16.3423"
      stroke="#FDFDFD"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.1904 29.1519H41.8093"
      stroke="#FDFDFD"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

export default AddIcon;
