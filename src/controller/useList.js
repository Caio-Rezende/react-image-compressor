import { useMemo, useState } from "react";
import { storageGet, storageList } from "../util/storage";

export function useList() {
  const [listCompressed, setListCompressed] = useState([]);
  const [originals, setOriginals] = useState({});

  useMemo(async () => {
    storageList().then(async (list) => {
      if (!list || list.length === 0) return;
      const listCompressed = [];
      const originals = {};
      await Promise.all(
        list.map(async (item) => {
          const id = item.key.replace(/(compressed|original)\//, "");
          const name = item.key.replace(/.*\//, "");
          const size = (item.size / 1024).toFixed(2);
          const link = await storageGet(item.key);
          const obj = { id, name, link, size };
          if (/compressed/.test(item.key)) {
            listCompressed.push(obj);
          } else {
            originals[id] = obj;
          }
        })
      );
      setListCompressed(listCompressed);
      setOriginals(originals);
    });
  }, []);

  return { listCompressed, originals };
}
