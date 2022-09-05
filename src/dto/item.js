import { S3Client } from "@aws-sdk/client-s3";

import { AWS_REGION } from "../constant/storage";
import { getLink } from "../util/backStorage";
import { FileNamingNoPath } from "../util/fileNaming";

// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: AWS_REGION });
class Item {
  static async transform(item) {
    const id = item.id.S.replace("compressed/", "");
    const name = item.id.S.replace(/.*\//, "");

    const fileNaming = new FileNamingNoPath(id, [
      "compressed",
      "original",
    ]);

    const link = await getLink(s3Client, fileNaming.compressed);
    const linkOriginal = await getLink(s3Client, fileNaming.original);

    return { id, name, link, linkOriginal };
  }
}

export const itemDTOTransform = Item.transform;
