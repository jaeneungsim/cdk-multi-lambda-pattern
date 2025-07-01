/**
 * @file Manages the application's configuration.
 * This is the single source of truth for defining Lambda functions and their settings.
 * Modifying this file is the primary way to add, remove, or reconfigure functions.
 */

import { AppConfig } from './types';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export const appConfig: AppConfig = {
  lambdaFunctions: {
    'sample-lambda-1': {
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 256,
      timeout: cdk.Duration.seconds(15),
      environment: {
        API_ENDPOINT: 'https://api.example.com/v1',
        LOG_LEVEL: 'INFO',
      },
    },
    'sample-lambda-2': {
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_20_X,
      // Using default memorySize and timeout
      environment: {
        TABLE_NAME: 'MyUsersTable',
        FEATURE_FLAG_A: 'true',
      },
    },
    'sample-lambda-3': {
      handler: 'handler.handler',
      runtime: lambda.Runtime.PYTHON_3_11,
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
    },
  },
};