import { AnimatePresence, motion } from "framer-motion";
import { useInputField } from "@/hooks/useInputField";
import MyInput from "./MyInput";
import SearchIcon from "../svg/icon/SearchIcon";
import { Pages } from "@/app/wrappers/PageWrapper";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

type MySearchBarField = {
  name: string;
  onClick: () => void;
};

interface MySearchBarProps {
  fields: MySearchBarField[];
}

const MySearchBar: React.FC<MySearchBarProps> = ({ fields }) => {
  const inputField = useInputField((_) => []);
  const [showResults, setShowResults] = useState(false);
  const [filteredFields, setFilteredFields] =
    useState<MySearchBarField[]>(fields);

  const updateFilteredFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filtered = fields.filter((field) =>
      field.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredFields(filtered);
  };

  return (
    <div className="">
      <div
        className={twMerge(
          showResults && "absolute z-40 rounded-xl drop-shadow"
        )}
        style={{ width: "calc(100vw - 2.5rem)" }}
      >
        <div
          className={twMerge(
            "rounded-xl border border-zinc-300 flex gap-3 items-center px-3",
            showResults &&
              "bg-white border-opacity-0 rounded-b-none rounded-t-xl"
          )}
        >
          <SearchIcon />
          <MyInput
            inputField={inputField}
            placeholder="Search for a setting..."
            className="bg-transparent w-full max-w-sm border-none py-3 px-0"
            divClassName="w-full"
            onChange={updateFilteredFields}
            onFocus={() => {
              //scroll to top
              if (typeof window !== "undefined") {
                window.scrollTo(0, 0);
              }
              setShowResults(true);
            }}
            // onBlur={() => setShowResults(false)}
          />
        </div>
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ height: "0", opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: "0", opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute top-full bg-white w-full z-30 rounded-t-none rounded-b-xl pl-10 py-3 flex flex-col gap-5 overflow-hidden"
            >
              {filteredFields.map((field) => {
                return (
                  <p
                    key={field.name}
                    onClick={field.onClick}
                    className="text-sm"
                  >
                    {field.name}
                  </p>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="absolute w-screen h-screen bg-black top-0 left-0"
            onClick={() => setShowResults(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MySearchBar;
