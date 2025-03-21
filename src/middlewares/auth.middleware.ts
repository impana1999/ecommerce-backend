/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response } from 'express';
import config from 'config';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth/auth.interface';
// import { UserModel } from '@/models';
import {
  validAdminMiddleware,
  validTempAdminMiddleware,
  validTempUserMiddleware,
  validUserMiddleware
} from './central.middleware';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      next(new HttpException(401, 'Please login to access this resource'));
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    req.user = decoded;
    if (decoded['type'] === 'USER') {
      return validUserMiddleware(req, res, next);
    } else if (decoded['type'] === 'ADMIN') {
      return validAdminMiddleware(req, res, next);
    } else {
      next(new HttpException(401, 'Invalid token recieved'));
    }
  } catch (err) {
    console.log('Error caught ', err);
    next(new HttpException(401, 'Please login to access this resource'));
  }
};

const authorizeMiddleware =
  (...roles) =>
    (req: RequestWithUser, res: Response, next: NextFunction) => {
      if (!roles.includes(req.user.userRole))
        return next(new HttpException(401, `User Role ${req?.user?.role ?? ''} is Unauthorize to Access this Resource`));
      return next();
    };

const authTempMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      next(new HttpException(401, 'Please login to access this resource'));
    }
  
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    req.user = decoded;

    if (decoded['type'] === 'USER') {
      return validTempUserMiddleware(req, res, next);
    } else if (decoded['type'] === 'ADMIN') {
      return validTempAdminMiddleware(req, res, next);
    }
  } catch (error) {
    console.log('Error caught ', error);
    next(new HttpException(401, 'Please login to access this resource'));
  }

};

export {
  authMiddleware,
  authorizeMiddleware,
  authTempMiddleware,
};

