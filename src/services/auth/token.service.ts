import mongoose from 'mongoose';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { generateAccessToken, generateRefreshToken, getAccessTokenExpiry, getRefreshTokenExpiry } from '@globals/jwt.global'
import { TokenModel } from '@models/index' ;


export default class TokenService {

    private tokenModel = TokenModel

    public async storeUserTokens(userId: string, tokens: { 
        accessToken: string,
        refreshToken: string,
        accessExpiryTime: string,
        refreshExpiryTime: string 
    }) {
        try {
            const { accessToken, refreshToken, accessExpiryTime, refreshExpiryTime } = tokens;

            return (await this.tokenModel.updateOne( { userId: Object(userId) }, {
                accessToken,
                refreshToken,
                accessExpiryTime,
                refreshExpiryTime
            }, { upsert: true }));

        }
        catch (err) {
            console.log('Could not store user tokens', err);
            // throw new HttpException(err.status || 500, err?.message || 'Something went wrong');
        }
    }

}
