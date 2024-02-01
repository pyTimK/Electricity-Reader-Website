import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface TitleProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
}

const Title: React.FC<TitleProps> = ({ onClick, size = 200 }) => (
  <div className="flex justify-center items-center text-center">
    <p className="text-2xl text-blue_light">Electricity</p>
    <p className="text-2xl text-blue font-semibold">Reader</p>
  </div>
);

export default Title;
