// import { PutItem, UpdateItem } from '@/types/dynamodb.types';
// import RedisService from '@lib/redis.lib';
// import DatabaseService from '@globals/dynamodb.global';
// import * as cacheKeys from '@constants/cache-keys.constants';
// import * as tables from '@constants/table-name.constants';
// import { HttpException } from '@/exceptions/HttpException';
// import { isEmpty } from './util';
// import { logger } from './logger';

// const redis = new RedisService();
// const DBService = new DatabaseService();

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// interface IUserSerialData {
//   id: string;
//   nextUserId: number;
//   isDeleted?: boolean;
//   createdAt?: string | number | Date;
//   updatedAt?: string | number | Date;
// }

// export const getUserID = async (): Promise<number> => {
//   try {
//     const id = await redis.get(cacheKeys.NEXT_USERID);

//     if (id) return Number(id);

//     const { Item: userIdData } = await DBService.get({
//       TableName: tables.APP_DATA,
//       Key: { id: tables.userSerialId },
//     });

//     if (isEmpty(userIdData)) {
//       logger.error('User Id Generation has issue :FIXME:');
//       throw new HttpException(500, 'User Id Generation has issue ');
//     }

//     return userIdData?.nextUserId;
//   } catch (err) {
//     throw new HttpException(err.status || 500, err?.message || 'User Id Generation has issue ');
//   }
// };

// export const incrementUserID = async () => {
//   try {
//     const updateParams: UpdateItem = {
//       TableName: tables.APP_DATA,
//       Key: { id: tables.userSerialId },
//       UpdateExpression: 'ADD #nextUserId :nextUserId',
//       ExpressionAttributeNames: { '#nextUserId': 'nextUserId' },
//       ExpressionAttributeValues: { ':nextUserId': 1 },
//     };

//     await Promise.all([redis.increment(cacheKeys.NEXT_USERID), DBService.update(updateParams)]);
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const setUserId = async () => {
//   try {
//     const [{ Item: userIdData }, idFromCache] = await Promise.all([
//       DBService.get({ TableName: tables.APP_DATA, Key: { id: tables.userSerialId } }),
//       redis.get(cacheKeys.NEXT_USERID),
//     ]);

//     if (!isEmpty(userIdData)) {
//       if (!idFromCache) await redis.setWithOutExpiry(cacheKeys.NEXT_USERID, userIdData.nextUserId);

//       return { success: true };
//     }

//     const putParams: PutItem = {
//       TableName: tables.APP_DATA,
//       Item: {
//         id: tables.userSerialId,
//         nextUserId: 1,
//         isDeleted: false,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       },
//     };

//     if (isEmpty(userIdData) && !!idFromCache) {
//       putParams.Item.nextUserId = +idFromCache;
//     } else {
//       putParams.Item.nextUserId = 1;
//     }

//     await Promise.all([DBService.create(putParams), redis.setWithOutExpiry(cacheKeys.NEXT_USERID, 1)]);
//   } catch (err) {
//     console.error(err);
//   }
// };
