import { AWS_MAX_KEYS } from "../../constant/storage";
import { itemDao } from "../../dao/item";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(400).json("Method not supported!");
  }

  const queryPage = parseInt(req.query.page, 10);
  const page = Math.max(queryPage ? queryPage : 1, 1);

  let data = [];
  let result;
  let total = 0;
  try {
    result = await itemDao.listPage();
    total = result.length;
    data = await Promise.all(
      result
        .splice((page - 1) * AWS_MAX_KEYS, page * AWS_MAX_KEYS)
        .map((item) => item.id.S.replace("compressed/", ""))
    );
  } catch (e) {
    console.debug(e);
  }
  res.status(200).json({
    data,
    page,
    total,
  });
}
