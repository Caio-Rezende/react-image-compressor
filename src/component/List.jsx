import { AWS_MAX_KEYS } from "../constant/storage";
import { useList } from "../controller/useList";
import { CardImage } from "./cardImage";

export function List() {
  const { listCompressed, getNextPage, nextPage } = useList();

  return (
    <div className="row mx-5">
      <h1 className="text-center mb-5 text-light ">All files compressed</h1>
      {listCompressed.map((id) => (
        <CardImage id={id} key={id} />
      ))}
      {nextPage && (
        <div className="row my-3 justify-content-center">
          <button className="mt-2 btn btn-dark w-75" onClick={getNextPage}>
            Load More
          </button>
        </div>
      )}
      <div className="row justify-content-center text-italic">
        {AWS_MAX_KEYS} per page
      </div>
    </div>
  );
}
