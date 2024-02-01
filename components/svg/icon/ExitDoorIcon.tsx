import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface ExitIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
}
const ExitIcon: React.FC<ExitIconProps> = ({ onClick }) => (
  <motion.svg
    width="40"
    height="41"
    viewBox="0 0 40 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 7.53436H13.3333C9.40497 7.53436 7.44078 7.53436 6.22038 8.75475C5 9.97515 5 11.9393 5 15.8677V24.201C5 28.1294 5 30.0935 6.22038 31.314C7.44078 32.5344 9.40497 32.5344 13.3333 32.5344H15"
      stroke="#C52222"
      strokeWidth="2"
    />
    <path
      d="M15 10.8284C15 7.00535 15 5.09385 16.1787 4.04887C17.3575 3.00388 19.1592 3.31813 22.7627 3.94663L26.644 4.6236C30.6348 5.31967 32.6302 5.66768 33.8152 7.13146C35 8.59523 35 10.7122 35 14.9462V25.1225C35 29.3565 35 31.4735 33.8152 32.9372C32.6302 34.401 30.6348 34.749 26.644 35.4452L22.7627 36.122C19.1592 36.7505 17.3575 37.0649 16.1787 36.0199C15 34.9749 15 33.0634 15 29.2404V10.8284Z"
      stroke="#C52222"
      strokeWidth="2"
    />
    <path
      d="M20 18.3677V21.701"
      stroke="#C52222"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </motion.svg>
);

export default ExitIcon;
