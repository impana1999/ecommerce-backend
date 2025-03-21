import { generateAccessToken, generateRefreshToken, getAccessTokenExpiry, getRefreshTokenExpiry } from "@/globals/jwt.global";
import { TokenPayload } from "@/interfaces"

export const generateUserTokenPayload = user => {
    console.log('generateUserTokenPayload user', user.id);
    const payload: TokenPayload = {
        id: user.id,
        email: user.email,
        mobileNumber: user.mobileNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        type: 'USER'
    }
    return payload;
}

export const generateTokensObject = userPayload => {
    const tokens = {
        accessToken: generateAccessToken(userPayload),
        refreshToken: generateRefreshToken(userPayload),
        accessExpiryTime: getAccessTokenExpiry(),
        refreshExpiryTime: getRefreshTokenExpiry()
    }
    return tokens;
}

//admin

export const generateAdminTokenPayload = admin => {
    const payload: TokenPayload = {
        id: admin.id,
        email: admin.email,
        mobileNumber: admin.mobileNumber,
        firstName: admin.firstName,
        lastName: admin.lastName,
        type: 'ADMIN'
    }
    return payload;
}

export const generateAdminTokensObject = adminPayload => {
    const tokens = {
        accessToken: generateAccessToken(adminPayload),
        refreshToken: generateRefreshToken(adminPayload),
        accessExpiryTime: getAccessTokenExpiry(),
        refreshExpiryTime: getRefreshTokenExpiry()
    }
    return tokens;
}



