// Set the AWS Region.
export const AWS_REGION = process.env.AWS_REGION; //e.g. ""

// Set the parameters
export const AWS_STORAGE_PARAMS = {
  Bucket: process.env.AWS_BUCKET_NAME, // The name of the bucket. For example, 'sample_bucket_101'.
  Prefix: "public/compressed",
  MaxKeys: parseInt(process.env.AWS_MAX_KEYS, 10),
};
