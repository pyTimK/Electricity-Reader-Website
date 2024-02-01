import { Inter, Julius_Sans_One, Outfit, Lekton } from "next/font/google";

const juliusSansOneFont = Julius_Sans_One({
  weight: "400",
  subsets: ["latin"],
});
export const jsoFont = juliusSansOneFont.className;
const interFontClass = Inter({ subsets: ["latin"] });
export const interFont = interFontClass.className;

const outfitFontClass = Outfit({ subsets: ["latin"] });
export const outfitFont = outfitFontClass.className;

const lektonFontClass = Lekton({ weight: "400", subsets: ["latin"] });
export const lektonFont = lektonFontClass.className;
