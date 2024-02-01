import FHT from "@/classes/templates/FHT";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useFHWatch = <T extends { id: string }>(
  fht: FHT<T>,
  id?: string
): [T | null, boolean, Dispatch<SetStateAction<boolean>>] => {
  const [obj, setObj] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    return fht.watch(id, (obj) => {
      setObj(obj);
      setLoading(false);
    });
  }, [id]);

  return [obj, loading, setLoading];
};
