import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface ImportIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
}

const ImportIcon: React.FC<ImportIconProps> = ({ onClick }) => (
  <motion.svg
    onClick={onClick}
    width="41"
    height="41"
    viewBox="0 0 41 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.9551 7.34558V24.0122M20.9551 24.0122L25.9551 19.0122M20.9551 24.0122L15.9551 19.0122"
      stroke="#262626"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.955 34.0123C13.5912 34.0123 7.6217 28.0428 7.6217 20.6789M34.2884 20.6789C34.2884 24.8896 32.3365 28.6443 29.2884 31.0879"
      stroke="#262626"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </motion.svg>
);

export default ImportIcon;
