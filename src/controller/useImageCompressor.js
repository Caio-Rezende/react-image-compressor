import { useCallback, useState } from "react";
import imageCompression from "browser-image-compression";

import {
  imageCompressorOptions,
  LIMIT_MAX_SIZE_MB,
} from "../constant/imageCompressor";

import { FileNaming } from "../util/fileNaming";
import { storageUpload, storageGet } from "../util/frontStorage";

export function useImageCompressor() {
  const [compressedLink, setCompressedLink] = useState();
  const [originalImage, setOriginalImage] = useState("");
  const [originalLink, setOriginalLink] = useState("");
  const [uploadImage, setUploadImage] = useState(false);
  const [outputFileName, setOutputFileName] = useState("");

  const onChangeFileInput = useCallback((e) => {
    const imageFile = e.target.files[0];
    setOriginalLink(URL.createObjectURL(imageFile));
    setOriginalImage(imageFile);
    setUploadImage(true);
  }, []);

  const onClickCompress = useCallback(
    (e) => {
      e.preventDefault();

      let maxLimitSizeReached = false;

      setCompressedLink("");

      if (
        imageCompressorOptions.maxSizeMB >=
        originalImage.size / 1024 / 1024
      ) {
        alert("Image is too small, can't be Compressed!");
        return 0;
      }
      if (LIMIT_MAX_SIZE_MB <= originalImage.size / 1024 / 1024) {
        alert(
          "Image is too big, won't be available in the storage! Only the compressed one."
        );
        maxLimitSizeReached = true;
      }

      //Compress image
      imageCompression(originalImage, imageCompressorOptions).then(
        async (compressedImage) => {
          const storageObjectKey = compressedImage.name;
          setOutputFileName(storageObjectKey);

          const fileNaming = new FileNaming(storageObjectKey, [
            "original",
            "compressed",
          ]);

          //Upload compressed image to storage
          await storageUpload(fileNaming.compressed, compressedImage);

          //Create link to the uploaded image
          const linkStorage = await storageGet(fileNaming.compressed);

          setCompressedLink(linkStorage);

          if (!maxLimitSizeReached) {
            //Upload compressed image to storage
            await storageUpload(fileNaming.original, originalImage);
          }
        }
      );

      return 1;
    },
    [originalImage]
  );

  return {
    compressedLink,
    originalLink,
    uploadImage,
    onChangeFileInput,
    onClickCompress,
    outputFileName,
  };
}
