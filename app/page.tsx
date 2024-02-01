"use client";

import "react-toastify/dist/ReactToastify.css";
import ConstantsWrapper from "./wrappers/ConstantsWrapper";
import { twMerge } from "tailwind-merge";
import { outfitFont } from "@/styles/fonts";
import { useEffect } from "react";
import { onMessageListener, requestForToken } from "./firebase";
import notify from "@/myfunctions/notify";

export default function Home() {
  return (
    <div className={twMerge("w-full h-full", outfitFont)}>
      <ConstantsWrapper />
    </div>
  );
}
