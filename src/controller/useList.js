import { useMemo, useState } from "react";

export function useList() {
  const [listCompressed, setListCompressed] = useState([]);
  const [nextPage, setNextPage] = useState();
  const [marker, setMarker] = useState();

  useMemo(async () => {
    const response = await fetch(
      "/api/list" + (marker ? `?marker=${marker}` : "")
    );

    if (response) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const listResult = await response.json();

        if (!listResult?.data || listResult.data.length === 0) return;

        setListCompressed([...listCompressed, ...listResult.data]);
        setNextPage(listResult.next);
      }
    }
  }, [marker]);

  const getNextPage = () => {
    if (nextPage) {
      setMarker(nextPage);
    }
  };

  return { listCompressed, nextPage, getNextPage };
}
