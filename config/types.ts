/**
 * @file Defines the type schema for the application configuration.
 * Centralizing type definitions ensures consistency and provides compile-time safety.
 */

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

/**
 * Configuration for a single Lambda function.
 */
export interface LambdaConfig {
  /**
   * The function's runtime environment.
   * @example lambda.Runtime.NODEJS_20_X
   */
  readonly runtime: lambda.Runtime;

  /**
   * The entry point handler.
   * @example "index.handler"
   */
  readonly handler: string;

  /**
   * The amount of memory (in MB) to allocate.
   * @default 128
   */
  readonly memorySize?: number;

  /**
   * The function timeout.
   * @default cdk.Duration.seconds(3)
   */
  readonly timeout?: cdk.Duration;

  /**
   * Key-value pairs to set as environment variables.
   */
  readonly environment?: { [key: string]: string };
}

/**
 * Root configuration for the entire CDK application.
 */
export interface AppConfig {
  /**
   * A map of logical function names to their configurations.
   * The key is used for naming resources and locating the function's code.
   */
  readonly lambdaFunctions: {
    readonly [functionName: string]: LambdaConfig;
  };
}
