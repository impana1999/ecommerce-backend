import { NextFunction, Response } from 'express';
import requestIp from 'request-ip';
import { RequestWithUser } from '@interfaces/auth/auth.interface';
import { HttpException } from '@/exceptions/HttpException';
import { logger } from '@/utils/logger';

const customHeaderKey = '8483ea18ca85ef8c14d183fd26ecb8659b2386950400f579a781682485b86b3c';
const userAgentsNotAllowed = ['PostmanRuntime/7.28.4', 'insomnia/2021.4.1'];

/**
 *
 *  @author      ASHUTOSH PANDA @ashutosh4336
 *  @desc        Custom Middleware
 *               to Check If user Is using a Browser or Not (In Production)
 */
export const serAgentCheck = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const userAgent = req.headers['user-agent'];

  const xApiAuth = req.headers['x-custom-api-auth'] ?? '';
  const apiClient = userAgentsNotAllowed.some(el => el === userAgent) ?? false;
  const userAgentCond = process.env.NODE_ENV === 'production' && (xApiAuth !== customHeaderKey || apiClient);
  if (userAgentCond) throw new HttpException(403, "You're not allowed to access this resource");

  if (process.env.NODE_ENV === 'production') logger.info('Source User Agent : ' + userAgent);

  //   if (process.env.NODE_ENV === 'production' && !acceptUser) {
  //     return next(new HttpException(400, 'Please use allowed devices'));
  //   }

  return next();
};

export const ipMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  let clientAddress = requestIp.getClientIp(req);

  if (clientAddress.substr(0, 7) == '::ffff:') {
    clientAddress = clientAddress.substr(7);
  }
  req.clientIP = clientAddress;

  if (process.env.NODE_ENV === 'production') logger.info('Source IP is : ' + req?.clientIP);
  next();
};

export const reqRouteMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  req.reqUrlPath = req.path;
  //   console.log(35, req.reqUrlPath);
  next();
};
