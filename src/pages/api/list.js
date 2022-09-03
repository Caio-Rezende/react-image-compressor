import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AWS_REGION, AWS_STORAGE_PARAMS } from "../../constant/storage";

// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: AWS_REGION });

export default async function handler(req, res) {
  const Marker = req.query.marker;

  let list = [];
  let result;
  try {
    result = await s3Client.send(
      new ListObjectsCommand({ ...AWS_STORAGE_PARAMS, Marker })
    );
    if (result && result.Contents) {
      await Promise.all(
        result.Contents.map(async (item) => {
          const id = item.Key.replace(/(compressed|original)\//, "");
          const name = item.Key.replace(/.*\//, "");
          const size = (item.Size / 1024).toFixed(2);

          const command = new GetObjectCommand({
            ...AWS_STORAGE_PARAMS,
            Key: item.Key,
          });

          // Create the presigned URL.
          const link = await getSignedUrl(s3Client, command, {
            expiresIn: 3600,
          });

          list.push({ id, name, link, size });
        })
      );
    }
  } catch (e) {
    console.debug(e);
  }
  res.status(200).json({
    data: list,
    next: result?.IsTruncated
      ? result?.NextMarker
        ? result?.NextMarker
        : result?.Contents?.[result?.Contents?.length - 1].Key
      : null,
  });
}
