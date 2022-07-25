import jwt from 'jsonwebtoken';

function issueToken(data: object, options: object) {
    return jwt.sign(data, 'test', options)
}

export default issueToken;