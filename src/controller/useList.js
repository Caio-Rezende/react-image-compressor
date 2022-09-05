import { useEffect, useState } from "react";
import { AWS_MAX_KEYS } from "../constant/storage";
import { fetcher } from "../util/fetcher";

export function useList() {
  const [listCompressed, setListCompressed] = useState([]);
  const [nextPage, setNextPage] = useState();
  const [page, setPage] = useState();

  useEffect(() => {
    const getList = async () => {
      const fetchList = new URL(
        "/api/list" + (page ? `?page=${page}` : ""),
        window.location
      );

      const listResult = await fetcher(fetchList);

      if (listResult) {
        const total = parseInt(listResult.total, 10);
        const resultPage = parseInt(listResult.page, 10);

        if (!listResult?.data || listResult.data.length === 0) return;

        const listed = AWS_MAX_KEYS * resultPage;
        setListCompressed([...listCompressed, ...listResult.data]);
        setNextPage(total > listed ? resultPage + 1 : undefined);
      }
    };
    getList();
  }, [page]);

  const getNextPage = () => {
    if (nextPage) {
      setPage(nextPage);
    }
  };

  return { listCompressed, nextPage, getNextPage };
}
