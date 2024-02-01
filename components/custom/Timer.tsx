import { FHContext } from "@/app/wrappers/FHWrapper";
import { lektonFont } from "@/styles/fonts";
import { useContext, useEffect, useState } from "react";

interface TimerProps {
  secLeft: number;
}

const Timer: React.FC<TimerProps> = ({ secLeft }) => {
  return <p className={`${lektonFont} text-7xl`}>{formatTimer(secLeft)}</p>;
};

function formatTimer(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export default Timer;
