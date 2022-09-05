import { itemDao } from "../../dao/item";
import { itemDTOTransform } from "../../dto/item";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const id = req.query.id;

    if (!Boolean(id)) {
      res.status(400).json("Missing id!");
    }

    res.status(200).json(await itemDao.addItem(id));
  } else {
    const id = req.query.id;

    if (!Boolean(id)) {
      res.status(400).json("Missing id!");
    }

    const item = await itemDao.getItem(id);

    if (!item) {
      res.status(404).json("No Item found");
    }

    res.status(200).json(await itemDTOTransform(item));
  }
}
