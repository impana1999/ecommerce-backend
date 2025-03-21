import mongoose from 'mongoose';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { generateAccessToken, generateRefreshToken, getAccessTokenExpiry, getRefreshTokenExpiry } from '@globals/jwt.global'
import { AdminTokenSchemaModel } from '@models/index' ;


export default class AdminTokenService {

    private adminTokenSchemaModel = AdminTokenSchemaModel

    public async storeAdminTokens(adminId: string, tokens: { 
        accessToken: string,
        refreshToken: string,
        accessExpiryTime: string,
        refreshExpiryTime: string 
    }) {
        try {
            const { accessToken, refreshToken, accessExpiryTime, refreshExpiryTime } = tokens;

            return (await this.adminTokenSchemaModel.updateOne( { adminId: Object(adminId) }, {
                accessToken,
                refreshToken,
                accessExpiryTime,
                refreshExpiryTime
            }, { upsert: true }));

        }
        catch (err) {
            console.log('Could not store admin tokens', err);
            // throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
        }
    }

}
