import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface VoltageIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
}

const VoltageIcon: React.FC<VoltageIconProps> = ({ onClick, size = 153 }) => (
  <motion.svg
    onClick={onClick}
    className="cursor-pointer"
    whileTap={{ scale: 0.8 }}
    width={size}
    viewBox="0 0 153 153"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M101.999 47.175C96.2618 47.175 91.1618 45.9 86.0618 43.9875L61.1993 31.875C52.2743 27.4125 37.6118 29.9625 31.2368 36.975L24.2243 44.625L15.2993 35.7L22.3118 28.05C32.5118 16.575 52.9118 12.75 66.9368 19.7625L92.4368 31.875C101.362 36.3375 116.024 33.7875 122.399 26.775L128.774 19.125L138.337 27.4125L131.324 35.0625C124.312 42.7125 113.474 47.175 101.999 47.175Z"
      fill="#018BCC"
    />
    <path
      d="M93.0743 69.4875H108.374L84.1493 140.25H67.5743L43.9868 69.4875H59.2868L76.4993 127.5L93.0743 69.4875Z"
      fill="#018BCC"
    />
  </motion.svg>
);

export default VoltageIcon;
