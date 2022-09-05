import { Card } from "react-bootstrap";
import { useCardImage } from "../controller/useCardImage";

export function CardImage({ id }) {
  const { link, linkOriginal, name } = useCardImage(id);

  return (
    <div className="row my-3" key={id}>
      <div className="col-6 justify-content-center">
        {link ? (
          <Card.Img
            variant="top"
            src={link}
            style={{
              height: "100%",
              width: "100%",
              maxHeight: "120px",
              objectFit: "contain",
            }}
            className="img-square"
          />
        ) : (
          "Carregando..."
        )}
      </div>
      <div className="col-6 justify-content-center">
        {Boolean(link) && (
          <a
            href={link}
            download={name}
            className="mt-2 btn btn-dark w-75"
            target="_blank"
          >
            Download Compressed
          </a>
        )}
        {Boolean(linkOriginal) && (
          <a
            href={linkOriginal}
            download={`original-${name}`}
            className="mt-2 btn btn-dark w-75"
            target="_blank"
          >
            Download Original
          </a>
        )}
      </div>
    </div>
  );
}
