import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface WattIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
}

const WattIcon: React.FC<WattIconProps> = ({ onClick, size = 139 }) => (
  <motion.svg
    onClick={onClick}
    className="cursor-pointer"
    whileTap={{ scale: 0.8 }}
    width={size}
    viewBox="0 0 139 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M102.393 140H83.0602L68.7395 79.853L54.4188 140H35.0858L15.0368 60.52H31.5056L45.1103 124.247L60.147 60.52H75.8999L90.9366 124.963L104.541 61.236H121.01L102.393 140ZM97.3809 34.7427C90.9366 34.7427 85.2083 33.3107 79.48 31.1626L51.5546 17.5579C41.5301 12.5456 25.0613 15.4098 17.9009 23.2862L10.0245 31.8786L0 21.8541L7.8764 13.2617C19.333 0.37301 42.2461 -3.92321 57.9989 3.95319L86.6404 17.5579C96.6649 22.5701 113.134 19.706 120.294 11.8296L127.454 3.23715L138.195 12.5456L130.319 21.1381C122.442 29.7305 110.27 34.7427 97.3809 34.7427Z"
      fill="#F96715"
    />
  </motion.svg>
);

export default WattIcon;
