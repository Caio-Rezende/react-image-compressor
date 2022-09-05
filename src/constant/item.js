export const ITEM_TABLE_CREATE_PARAMS = {
  AttributeDefinitions: [
    {
      AttributeName: "id",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "id",
      KeyType: "HASH",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: "ITEM",
  StreamSpecification: {
    StreamEnabled: false,
  },
};

export const ITEM_TABLE_ADD_PARAMS = (id) => ({
  TableName: "ITEM",
  Item: {
    id: { S: id },
  },
});

export const ITEM_TABLE_GET_PARAMS = (id) => ({
  TableName: "ITEM",
  Key: {
    id: { S: id },
  },
});

export const ITEM_TABLE_SCAM_PARAMS = (ExclusiveStartKey) => ({
  TableName: "ITEM",
  Select: "ALL_ATTRIBUTES",
  ExclusiveStartKey,
});
