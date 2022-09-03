import React from "react";

import Card from "react-bootstrap/Card";
import { useImageCompressor } from "../controller/useImageCompressor";

export function ImageCompressor() {
  const {
    compressedLink,
    originalLink,
    uploadImage,
    onChangeFileInput,
    onClickCompress,
    outputFileName,
  } = useImageCompressor();

  return (
    <div className="m-5">
      <div className="text-light text-center">
        <h1>Three Simple Steps</h1>
        <h3>1. Upload Image</h3>
        <h3>2. Click on Compress</h3>
        <h3>3. Download Compressed Image</h3>
      </div>

      <div className="row mt-5">
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
          {uploadImage ? (
            <Card.Img className="ht" variant="top" src={originalLink} />
          ) : (
            <Card.Img
              className="ht"
              variant="top"
              src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
            />
          )}
          <div className="d-flex justify-content-center">
            <input
              type="file"
              accept="image/*"
              className="mt-2 btn btn-dark w-75"
              onChange={onChangeFileInput}
            />
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
          <br />
          {originalLink ? (
            <button
              type="button"
              className=" btn btn-dark"
              onClick={onClickCompress}
            >
              Compress
            </button>
          ) : null}
        </div>

        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
          {Boolean(compressedLink) ? (
            <>
              <Card.Img variant="top" src={compressedLink} />

              <div className="d-flex justify-content-center">
                <a
                  href={compressedLink}
                  download={outputFileName}
                  className="mt-2 btn btn-dark w-75"
                  target="_blank"
                >
                  Download
                </a>
              </div>
            </>
          ) : compressedLink === "" ? (
            "Processing..."
          ) : null}
        </div>
      </div>
    </div>
  );
}
