import jwt from 'jsonwebtoken'

class TokenService {

    generateTokens(payload: object) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {expiresIn: 900000});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {expiresIn: "30d"});
        return {
            accessToken,
            refreshToken,
        }
    }

    verifyAccessToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
        } catch (e) {
            return null;
        }
    }

    verifyRefreshToken(refreshToken: string) {
        try {
            return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);
        } catch (e) {
            return null;
        }
    }

}

export default TokenService;