import { useEffect, useState } from "react";
import { fetcher } from "../util/fetcher";

export function useCardImage(item) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [linkOriginal, setLinkOriginal] = useState("");

  useEffect(() => {
    const getItem = async () => {
      const fetchList = new URL(
        "/api/item" + (item ? `?id=${item}` : ""),
        window.location
      );

      const res = await fetcher(fetchList);
      if (!res) return;

      setName(res.name);
      setLink(res.link);
      setLinkOriginal(res.linkOriginal);
    };

    getItem();
  }, [item]);

  return { name, link, linkOriginal };
}
