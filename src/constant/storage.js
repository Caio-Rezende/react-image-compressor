// Set the AWS Region.
export const AWS_REGION = process.env.AWS_REGION;

export const AWS_MAX_KEYS = parseInt(
  process.env.NEXT_PUBLIC_AWS_MAX_KEYS ?? 1,
  10
);

// Set the parameters
export const AWS_STORAGE_PARAMS = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Prefix: "public/compressed",
  MaxKeys: AWS_MAX_KEYS,
};
