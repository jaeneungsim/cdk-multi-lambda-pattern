/**
 * @file A custom CDK construct for creating a Lambda function and its corresponding API Gateway integration.
 * This construct encapsulates the common pattern of creating a Lambda-backed API endpoint.
 */

import { Construct } from 'constructs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { LambdaConfig } from '../../config/types';

/**
 * Properties for the ApiLambdaConstruct.
 */
export interface ApiLambdaConstructProps {
  /** The logical name of the function, used for resource naming and code path. */
  readonly functionName: string;
  /** The API Gateway REST API to attach the new resource to. */
  readonly api: apigw.RestApi;
  /** The configuration for the Lambda function. */
  readonly config: LambdaConfig;
}

/**
 * A reusable construct that provisions a Lambda function and integrates it
 * with a new API Gateway resource.
 */
export class ApiLambdaConstruct extends Construct {
  constructor(scope: Construct, id: string, props: ApiLambdaConstructProps) {
    super(scope, id);

    const { functionName, api, config } = props;

    const func = new lambda.Function(this, 'LambdaFunction', {
      runtime: config.runtime,
      handler: config.handler,
      // The code for each function is expected to be in `lambda/{functionName}`
      code: lambda.Code.fromAsset(path.join(__dirname, `../../lambda/${functionName}`)),
      functionName: `${functionName}-handler`,
      memorySize: config.memorySize,
      timeout: config.timeout,
      environment: config.environment,
    });

    // Create an API Gateway resource (e.g., /sample-lambda-1)
    const resource = api.root.addResource(functionName);
    const lambdaIntegration = new apigw.LambdaIntegration(func);

    // Add a GET method to the resource
    resource.addMethod('GET', lambdaIntegration);
  }
}
