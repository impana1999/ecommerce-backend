import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    // if (process.env.NODE_ENV === 'development') {

    // }

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);

    res.status(status).json({ response: { status: false, responseCode: status, message } });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;

/**
 * 
// Handles errors during DeleteItem execution. Use recommendations in error messages below to 
// add error handling specific to your application use-case. 
function handleDeleteItemError(err) {
  if (!err) {
    console.error('Encountered error object was empty');
    return;
  }
  if (!err.code) {
    console.error(`An exception occurred, investigate and configure retry strategy. Error: ${JSON.stringify(err)}`);
    return;
  }
  switch (err.code) {
    case 'ConditionalCheckFailedException':
      console.error(`Condition check specified in the operation failed, review and update the condition check before retrying. Error: ${err?.message}`);
      return;
    case 'TransactionConflictException':
      console.error(`Operation was rejected because there is an ongoing transaction for the item, generally safe to retry ' +
       'with exponential back-off. Error: ${err?.message}`);
       return;
    case 'ItemCollectionSizeLimitExceededException':
      console.error(`An item collection is too large, you're using Local Secondary Index and exceeded size limit of` + 
        `items per partition key. Consider using Global Secondary Index instead. Error: ${err?.message}`);
      return;
    default:
      break;
    // Common DynamoDB API errors are handled below
  }
  handleCommonErrors(err);
}

function handleCommonErrors(err) {
  switch (err.code) {
    case 'InternalServerError':
      console.error(`Internal Server Error, generally safe to retry with exponential back-off. Error: ${err?.message}`);
      return;
    case 'ProvisionedThroughputExceededException':
      console.error(`Request rate is too high. If you're using a custom retry strategy make sure to retry with exponential back-off. `
        + `Otherwise consider reducing frequency of requests or increasing provisioned capacity for your table or secondary index. Error: ${err?.message}`);
      return;
    case 'ResourceNotFoundException':
      console.error(`One of the tables was not found, verify table exists before retrying. Error: ${err?.message}`);
      return;
    case 'ServiceUnavailable':
      console.error(`Had trouble reaching DynamoDB. generally safe to retry with exponential back-off. Error: ${err?.message}`);
      return;
    case 'ThrottlingException':
      console.error(`Request denied due to throttling, generally safe to retry with exponential back-off. Error: ${err?.message}`);
      return;
    case 'UnrecognizedClientException':
      console.error(`The request signature is incorrect most likely due to an invalid AWS access key ID or secret key, fix before retrying. `
        + `Error: ${err?.message}`);
      return;
    case 'ValidationException':
      console.error(`The input fails to satisfy the constraints specified by DynamoDB, `
        + `fix input before retrying. Error: ${err?.message}`);
      return;
    case 'RequestLimitExceeded':
      console.error(`Throughput exceeds the current throughput limit for your account, `
        + `increase account level throughput before retrying. Error: ${err?.message}`);
      return;
    default:
      console.error(`An exception occurred, investigate and configure retry strategy. Error: ${err?.message}`);
      return;
  }
}

 */
