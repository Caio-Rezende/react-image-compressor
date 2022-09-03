import { Card } from "react-bootstrap";
import { useList } from "../controller/useList";

export function List() {
  const { listCompressed, originals } = useList();

  return (
    <div className="row my-5 mx-5">
      <h1 className="text-center mb-5">All files compressed</h1>
      {listCompressed.map((item) => (
        <div className="row my-3">
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
              Download Compressed ({item.size}Kb)
            </a>
            {Boolean(originals[item.id]) && (
              <a
                href={originals[item.id].link}
                download={originals[item.id].name}
                className="mt-2 btn btn-dark w-75"
                target="_blank"
              >
                Download Original ({originals[item.id].size}Kb)
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
