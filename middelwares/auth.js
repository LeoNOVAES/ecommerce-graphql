const jwt = require("jsonwebtoken");
const config = require('../config');

module.exports = (req, res, next) => {
    try {        
        const token = req.headers.authorization;
        if(!token || token === '') {
            req.isAuth = false;
            return next();
        }
        
        const decodedToken = jwt.verify(token, config.jwtSecret);

        if(!decodedToken) {
            req.isAuth = false;
            return next();
        }

        req.isAuth = true;
        req.userId = decodedToken.id;
        req.role = decodedToken.role;
        return next();
    } catch ($e) {
        req.isAuth = false;
        return next();
    }
}