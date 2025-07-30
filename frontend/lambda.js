// AWS Lambda function for the CI/CD PoC Frontend
exports.handler = async (event, context) => {
    console.log('Event: ', JSON.stringify(event, null, 2));
    console.log('Context: ', JSON.stringify(context, null, 2));

    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        body: JSON.stringify({
            message: 'CI/CD PoC Frontend Lambda Function',
            timestamp: new Date().toISOString(),
            event: event,
            context: {
                requestId: context.awsRequestId,
                functionName: context.functionName,
                functionVersion: context.functionVersion
            }
        })
    };

    return response;
}; 