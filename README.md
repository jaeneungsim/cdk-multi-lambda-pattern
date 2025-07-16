# Configuration-Driven AWS Lambda API with CDK

![Language](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Framework](https://img.shields.io/badge/AWS_CDK-FF9900?style=for-the-badge&logo=aws-cdk&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

This project demonstrates how to easily implement a configuration-driven pattern for building multiple AWS Lambda functions and their corresponding API Gateway endpoints from a single, centralized configuration file. It showcases a powerful, scalable, and maintainable approach for managing serverless applications on AWS using the AWS Cloud Development Kit (CDK).

**⚠️ Important:** This is a demonstration project intended for learning and development purposes. For production environments, ensure proper security configurations including AWS WAF, appropriate IAM policies, VPC settings, and other security best practices are implemented. This codebase should not be deployed directly to production without thorough security review and hardening.

## Key Features

- **Configuration-Driven:** Add, remove, or modify Lambda functions by simply editing one configuration file (`config/config.ts`). No repetitive infrastructure code is needed.
- **Separation of Concerns:** A clean separation between infrastructure code (`lib/`), application code (`lambda/`), and configuration (`config/`).
- **Reusable Constructs:** Uses a custom CDK `Construct` (`ApiLambdaConstruct`) to encapsulate the creation of a Lambda function and its API Gateway integration, promoting DRY (Don't Repeat Yourself) principles.
- **Multi-Runtime Support:** The configuration allows defining different runtimes (e.g., Node.js, Python) for each function.
- **Type-Safe:** Leverages TypeScript to ensure that the configuration adheres to a defined schema, preventing common errors at compile time.

## Architecture

The architecture is straightforward: a single Amazon API Gateway acts as a proxy for multiple AWS Lambda functions. Each function is exposed via a unique resource path (e.g., `/api/sample-lambda-1`).

```
A[Client] --> B{API Gateway};
B --> C[/sample-lambda-1];
B --> D[/sample-lambda-2];
B --> E[/sample-lambda-3];

C --> F[(Node.js Lambda 1)];
D --> G[(Node.js Lambda 2)];
E --> H[(Python Lambda 3)];
```

## Project Structure

The project is organized to maintain a clear separation of concerns:

```
.
├── bin/                # CDK entrypoint
├── config/             # Application configuration
│   ├── config.ts       # The single source of truth for all Lambda functions
│   └── types.ts        # TypeScript types for the configuration
├── lambda/             # Lambda function application code
│   ├── sample-lambda-1/  # Code for the first function
│   └── ...
├── lib/                # CDK infrastructure code (Stacks and Constructs)
│   ├── app-stack.ts      # Main CDK stack
│   └── constructs/     # Reusable CDK constructs
│       └── api-lambda-construct.ts
├── test/               # Test files
├── README.md           # This file
├── cdk.json
└── package.json
```

## Prerequisites

- Node.js (v18 or later)
- AWS CLI configured with your credentials
- AWS CDK Toolkit (`npm install -g aws-cdk`)

## Setup and Deployment

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Deploy the stack to your AWS account:**
    This command will synthesize the CloudFormation template and deploy all the resources defined in the configuration.
    ```sh
    cdk deploy
    ```

    After a successful deployment, the CDK will output the API endpoint URLs for each function:

    ```
    Outputs:
    AppStack.sample-lambda-1ApiUrl = https://xxxx.execute-api.us-east-1.amazonaws.com/prod/sample-lambda-1
    AppStack.sample-lambda-2ApiUrl = https://xxxx.execute-api.us-east-1.amazonaws.com/prod/sample-lambda-2
    ...
    ```

## Testing the API

You can test the deployed endpoints using a tool like `curl` or your web browser.

```sh
# Test the first Lambda function
curl https://xxxx.execute-api.us-east-1.amazonaws.com/prod/sample-lambda-1

# Expected Output:
# Hello from sample-lambda-1! You've hit /sample-lambda-1
```

## How to Add a New Lambda Function

Adding a new function is a simple, two-step process:

1.  **Add a new entry** to the `lambdaFunctions` object in `config/config.ts`.

    ```typescript
    // in config/config.ts
    'my-new-function': {
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_20_X,
    },
    ```

2.  **Create a new folder** inside the `lambda/` directory with the same name (`my-new-function`) and add your handler code (e.g., `index.js`).

    ```javascript
    // lambda/my-new-function/index.js
    exports.handler = async (event) => {
      return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: "Hello from my new function!",
      };
    };
    ```

3.  **Deploy the changes:**
    ```sh
    cdk deploy
    ```

That's it! The CDK will automatically provision the new Lambda function and its API Gateway endpoint.

## Useful CDK Commands

- `npm run build`: Compile typescript to js
- `npm run watch`: Watch for changes and compile
- `npm run test`: Perform the jest unit tests
- `cdk deploy`: Deploy this stack to your default AWS account/region
- `cdk diff`: Compare deployed stack with current state
- `cdk synth`: Emits the synthesized CloudFormation template
- `cdk destroy`: Remove the stack from your AWS account

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.