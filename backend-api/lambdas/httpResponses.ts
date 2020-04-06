const createResponse = (
  statusCode: number,
  bodyMessage: any
): httpResponse => ({
  isBase64Encoded: false,
  statusCode: statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: bodyMessage,
    ok: statusCode === 200 ? true : false
  })
});

export const successResponse = (bodyMessage: any) =>
  createResponse(200, bodyMessage);

export const clientErrorResponse = (bodyMessage: any) =>
  createResponse(400, bodyMessage);

export type httpResponse = {
  isBase64Encoded: boolean;
  statusCode: number;
  headers: {
    "Access-Control-Allow-Origin": string;
    "Content-Type": string;
  };
  body: string;
};
