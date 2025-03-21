/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth/auth.interface';
// import DatabaseService from '@/globals/dynamodb.global';
// import * as tables from '@constants/table-name.constants';
import { AdminModel, UserModel } from '@models/index';

// const databaseService = new DatabaseService();

const validUserMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const reqMethod = req.method;
  let user;

  user = await UserModel.findById({
    _id: req.user.id
  });
  if (user && !user.isLoggedIn) {
    next(new HttpException(401, 'Session expired! Please log in to continue'));
  }

  next();
};

const validAdminMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const reqMethod = req.method;
  let admin;

  admin = await AdminModel.findById({
    _id: req.user.id
  });

  req.user.role = admin.role;
  if (admin.isSuspended) {
    next(new HttpException(406, 'Your account is suspended!'));
  }
  next();
};

const adminRoleMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const role = req.user.role;
  next();
};

const validTempUserMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const reqMethod = req.method;
  let user;

  if (reqMethod !== 'GET') {
    (user = await UserModel.findById({
      _id: req.user.id
    }));
    if (user && user.isSuspended) {
      next(new HttpException(406, 'Your account is suspended!'));
    }
  }
  next();
};

const validTempAdminMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const reqMethod = req.method;
  let admin;

  if (reqMethod !== 'GET') {
    (admin = await AdminModel.findById({
      _id: req.user.id
    }));
    if (admin.isSuspended) {
      next(new HttpException(406, 'Your account is suspended!'));
    }
  }
  next();
};


const userRequestMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  req.headers['requestUserType'] = 'USER'
  next();
};


const adminRequestMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  req.headers['requestUserType'] = 'ADMIN'
  next();
};


export {
  validUserMiddleware,
  validAdminMiddleware,
  validTempUserMiddleware,
  validTempAdminMiddleware,
  adminRoleMiddleware,
  userRequestMiddleware,
  adminRequestMiddleware
};
