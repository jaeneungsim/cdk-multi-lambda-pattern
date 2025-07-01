/**
 * @file Defines the main application stack (AppStack).
 * This stack orchestrates the deployment of the API Gateway and all Lambda functions
 * based on the application configuration.
 */

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { appConfig } from '../config/config';
import { ApiLambdaConstruct } from './constructs/api-lambda-construct';

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Provision the central API Gateway for the application.
    const api = new apigw.RestApi(this, 'MultiLambdaApi', {
      restApiName: 'Multi-Lambda-API', // Use kebab-case for resource names
      description: 'Dynamically provisions Lambda functions based on configuration.',
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
      },
    });

    // Create a Lambda-backed API endpoint for each entry in the configuration.
    for (const [functionName, config] of Object.entries(appConfig.lambdaFunctions)) {
      new ApiLambdaConstruct(this, `${functionName}Resource`, {
        functionName,
        api,
        config,
      });

      // Output the full URL for the new endpoint.
      new cdk.CfnOutput(this, `${functionName}ApiUrl`, {
        value: `${api.url}${functionName}`,
      });
    }
  }
}
