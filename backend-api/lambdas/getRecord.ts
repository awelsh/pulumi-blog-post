import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { clientErrorResponse, successResponse } from './httpResponses';

export async function getRecordHandler(
  dbClient: DynamoDB.DocumentClient,
  tableName: string,
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  
  if (!event.body){
    return clientErrorResponse("Missing body in request");
  }

  // ...
  // Code to acces DynamoDB record
  // ...

  return successResponse(/* fetchedItem */);
}
