import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface ClockOutlinedIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  selected?: boolean;
}

const ClockOutlinedIcon: React.FC<ClockOutlinedIconProps> = ({
  onClick,
  size = 36,
  selected = false,
}) => {
  const color = selected ? "#EC1D37" : "#AAAAAA";
  return (
    <motion.svg
      onClick={onClick}
      className="cursor-pointer"
      whileTap={{ scale: 0.8 }}
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.0482 31.2642C25.297 31.2642 31.1732 25.388 31.1732 18.1392C31.1732 10.8905 25.297 5.01422 18.0482 5.01422C10.7995 5.01422 4.92322 10.8905 4.92322 18.1392C4.92322 25.388 10.7995 31.2642 18.0482 31.2642Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0482 9.38922V18.1392"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.2316 24.3226L18.0482 18.1392"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};

export default ClockOutlinedIcon;
