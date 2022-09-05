import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { AWS_STORAGE_PARAMS } from "../constant/storage";

export async function getLink(s3Client, Key) {
  const command = new GetObjectCommand({
    ...AWS_STORAGE_PARAMS,
    Key,
  });

  // Create the presigned URL.
  return await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });
}
