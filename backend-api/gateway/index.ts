import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";
import { DynamoDB } from "aws-sdk";
import { getRecordHandler } from "../lambdas/getRecord";
import { postRecordHandler } from "../lambdas/postRecord";

const env = pulumi.getStack().split('.')[1];
const infraConfig = new pulumi.StackReference(`infrastructure.${env}`);
const tableName = infraConfig.getOutput("tableName");

async function getRecord(event: awsx.apigateway.Request): Promise<awsx.apigateway.Response> {
  const dbClient = new DynamoDB.DocumentClient();
  const dbTableName = tableName.get();
  return getRecordHandler(dbClient, dbTableName, event);
}

async function postRecord(event: awsx.apigateway.Request): Promise<awsx.apigateway.Response> {
  const dbClient = new DynamoDB.DocumentClient();
  const dbTableName = tableName.get();
  return postRecordHandler(dbClient, dbTableName, event);
}

const apiGateway = new awsx.apigateway.API(
  "pulumi-blog-post-api",
  {
    stageName: env,
    routes: [
      {
        path: "points/get",
        method: "GET",
        eventHandler: getRecord
      },
      {
        path: "raise",
        method: "POST",
        eventHandler: postRecord
      }
    ]
  }
);

export const apiUrl = apiGateway.url;