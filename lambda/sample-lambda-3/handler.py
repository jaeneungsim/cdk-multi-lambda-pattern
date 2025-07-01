import json

def handler(event, context):
    print("request: {}".format(json.dumps(event)))
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'text/plain'
        },
        'body': 'Hello from sample-lambda-3! You\'ve hit {}\n'.format(event.get('path'))
    }
