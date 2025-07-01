/**
 * Handler for sample-lambda-1.
 */
exports.handler = async (event) => {
  console.log("Request event:", JSON.stringify(event, null, 2));

  const apiEndpoint = process.env.API_ENDPOINT || 'not set';

  const message = `Hello from sample-lambda-1! The API endpoint is ${apiEndpoint}.`;

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `${message}\n`,
  };
};
