import { Card } from "react-bootstrap";
import { useList } from "../controller/useList";

export function List() {
  const { listCompressed, getNextPage, nextPage } = useList();

  return (
    <div className="row mx-5">
      <h1 className="text-center mb-5 text-light ">All files compressed</h1>
      {listCompressed.map((item) => (
        <div className="row my-3" key={item.id}>
          <div className="col-6 justify-content-center">
            <Card.Img
              variant="top"
              src={item.link}
              style={{
                height: "100%",
                width: "100%",
                maxHeight: "120px",
                objectFit: "contain",
              }}
              className="img-square"
            />
          </div>
          <div className="col-6 justify-content-center">
            <a
              href={item.link}
              download={item.name}
              className="mt-2 btn btn-dark w-75"
              target="_blank"
            >
              Download Compressed
            </a>
            {Boolean(item.linkOriginal) && (
              <a
                href={item.linkOriginal}
                download={`original-${item.name}`}
                className="mt-2 btn btn-dark w-75"
                target="_blank"
              >
                Download Original
              </a>
            )}
          </div>
        </div>
      ))}
      {nextPage && (
        <div className="row my-3 justify-content-center">
          <button className="mt-2 btn btn-dark w-75" onClick={getNextPage}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
