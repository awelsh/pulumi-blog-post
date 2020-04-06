import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const env = pulumi.getStack().split('.')[1];

export const table = new aws.dynamodb.Table(
  `blog-post-table-${env}`,
  {
    tags: {
      application: "pulumi-blog-post",
      environment: env
  },
    attributes: [
      { name: "RecordID", type: "S" },
      { name: "Status", type: "S" },
      { name: "Count", type: "N" }
    ],
    globalSecondaryIndexes: [
      {
        name: "StatusIndex",
        hashKey: "Status",
        rangeKey: "Count",
        projectionType: "INCLUDE",
        nonKeyAttributes: ["Description", "CreatedOn"]
      }
    ],
    billingMode: "PAY_PER_REQUEST",
    hashKey: "RecordID",
    streamEnabled: true,
    streamViewType: "NEW_AND_OLD_IMAGES",
    ttl: {
      attributeName: "TimeToExist",
      enabled: false
    }
  }
);
