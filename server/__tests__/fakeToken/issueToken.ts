import jwt from 'jsonwebtoken';

function issueToken(data: any, options: object) {
    return jwt.sign(data, 'test', options)
}

export default issueToken;