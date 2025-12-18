// import jwt from 'jsonwebtoken';
const jwt = require("jsonwebtoken")
require("dotenv").config()

function authenticator(req, res, next){
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) return res.status(401).json({ err: 'Missing token' });

    const parts = authHeader.split(' ');
    const token = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : authHeader;

    if (!token) return res.status(401).json({ err: 'Missing token' });

    jwt.verify(token, process.env.SECRET_TOKEN, (err, data) => {
        if (err) {
            return res.status(401).json({ err: 'Invalid token' });
        }

        req.user = data;
        next();
    });
}

// export default authenticator;
module.exports = authenticator;