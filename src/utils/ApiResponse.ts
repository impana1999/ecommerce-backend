import httpStatus from 'http-status';
import { Response } from 'express';

export const successResponse = (res: Response, msg: string) =>
  res.status(200).json({
    response: {
      status: true,
      responseCode: 200,
      message: msg,
    },
  });

export const createdDataResponse = (res: Response, msg: string, data: object) =>
  res.status(httpStatus.CREATED).json({
    response: {
      status: true,
      responseCode: 201,
      message: msg,
    },
    data,
  });

export const successResponseWithData = (res: Response, msg: string, data: object) =>
  res.status(200).json({
    response: {
      status: true,
      responseCode: 200,
      message: msg,
    },
    data,
  });
  export const successFullyLoggedOut = (res: Response, msg: string) =>
  res.status(200).json({
    response: {
      status: true,
      responseCode: 200,
      message: msg,
      
    }
  });

export const ErrorResponse = (res: Response, msg: string, data: object) =>
  res.status(401).json({
    response: {
      status: true,
      responseCode: 401,
      message: msg,
    },
    data,
  });
export const ErrorResponseWithData = (res: Response, msg: string, data?: object) =>
  res.status(400).json({
    response: {
      status: false,
      responseCode: 400,
      message: msg,
    },
    data,
  });
// exports.ErrorResponse = function (res, msg) {
//   const data = {
//     response: {
//       status: false,
//       responseCode: 500,
//       message: msg,
//     },
//   };
//   return res.status(500).json(data);
// };

// exports.ErrorResponseWithData = function (res, msg, data) {
//   const resData = {
//     response: {
//       status: 0,
//       code: 500,
//       message: msg,
//     },
//     data,
//   };
//   return res.status(500).json(resData);
// };

// exports.notFoundResponse = function (res, msg) {
//   const data = {
//     response: {
//       status: 0,
//       code: 404,
//       message: msg,
//     },
//   };
//   return res.status(404).json(data);
// };

// exports.validationErrorWithData = function (res, msg, data) {
//   const resData = {
//     response: {
//       status: 0,
//       code: 400,
//       message: msg,
//     },
//     data,
//   };
//   return res.status(400).json(resData);
// };

// exports.validationError = function (res, msg) {
//   const resData = {
//     response: {
//       status: 0,
//       code: 400,
//       message: msg,
//     },
//   };
//   return res.status(400).json(resData);
// };

// exports.unauthorizedResponse = function (res, msg) {
//   const data = {
//     response: {
//       status: 0,
//       code: 401,
//       message: msg,
//     },
//   };
//   return res.status(401).json(data);
// };

// exports.unprocessable = function (res, msg) {
//   const data = {
//     response: {
//       status: 0,
//       code: 422,
//       message: msg,
//     },
//   };
//   return res.status(422).json(data);
// };
