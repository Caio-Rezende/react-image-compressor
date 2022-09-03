import { Amplify, Storage } from "aws-amplify";
import awsConfig from "../aws-exports";

Amplify.configure(awsConfig);

export async function storageUpload(filename, file) {
  try {
    return await Storage.put(filename, file, {
      contentType: file.type,
      level: "public",
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
      errorCallback: (err) => {
        console.error("Unexpected error while uploading", err);
      },
    });
  } catch (e) {
    console.debug(e);
  }
}

export async function storageGet(filename) {
  try {
    return await Storage.get(filename);
  } catch (e) {
    console.debug(e);
  }
}

export async function storageList() {
  try {
    return await Storage.list("", { maxKeys: "ALL" });
  } catch (e) {
    console.debug(e);
  }
}
