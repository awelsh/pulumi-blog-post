import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { clientErrorResponse, successResponse } from './httpResponses';

export async function postRecordHandler(
  dbClient: DynamoDB.DocumentClient,
  tableName: string,
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  
  if (!event.body){
    return clientErrorResponse("Missing body in request");
  }

  const itemToInsert = JSON.parse(event.body);
  // ...
  // Code to insert DynamoDB record
  // ...

  return successResponse(itemToInsert)
}