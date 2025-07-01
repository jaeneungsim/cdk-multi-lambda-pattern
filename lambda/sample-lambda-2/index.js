/**
 * Handler for sample-lambda-2.
 */
exports.handler = async (event) => {
  console.log("Request event:", JSON.stringify(event, null, 2));

  const tableName = process.env.TABLE_NAME || 'not set';

  const message = `Hello from sample-lambda-2! The table name is ${tableName}.`;

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `${message}\n`,
  };
};
