const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(400).json('Autherization denail');

    try {
        const decode = jwt.verify(token, config.get('jwtSecred'));
        req.user = decode;
        next();
    }
    catch (e) {
        return res.status(400).json("invalid token")
    }
}
module.exports=auth;