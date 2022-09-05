import {
  DynamoDBClient,
  PutItemCommand,
  CreateTableCommand,
  ScanCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import {
  ITEM_TABLE_ADD_PARAMS,
  ITEM_TABLE_CREATE_PARAMS,
  ITEM_TABLE_SCAM_PARAMS,
  ITEM_TABLE_GET_PARAMS,
} from "../constant/item";
import { AWS_REGION } from "../constant/storage";

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({ region: AWS_REGION });

class Item {
  async initDb() {
    return this.exec(new CreateTableCommand(ITEM_TABLE_CREATE_PARAMS));
  }

  async addItem(id) {
    return this.exec(new PutItemCommand(ITEM_TABLE_ADD_PARAMS(id)));
  }

  async getItem(id) {
    const item = await this.exec(
      new GetItemCommand(ITEM_TABLE_GET_PARAMS(`compressed/${id}`))
    );
    return item.Item;
  }

  async listPage(LastEvaluatedKey) {
    const res = await this.exec(
      new ScanCommand(ITEM_TABLE_SCAM_PARAMS(LastEvaluatedKey))
    );
    if (res?.Items) {
      if (res.LastEvaluatedKey) {
        return [...res.Items, ...(await this.listPage(res.LastEvaluatedKey))];
      }
      return res.Items;
    }
  }

  async exec(command) {
    try {
      const data = await ddbClient.send(command);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}

export const itemDao = new Item();
