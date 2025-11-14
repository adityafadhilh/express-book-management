const jwt = require('jsonwebtoken');
const HttpStatus = require('../config/httpStatus');

const checkJwt = (req, res, next) => {
    console.log('JWT CHECK');
    try { 
        jwt.verify(req.headers['authorization'], process.env.JWT_SECRET, (err, token) => {
            if (err) throw err;
            if (token) {
                req.user = {
                    ...token._doc
                };
                next();
            }
        });
    } catch (error) {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: "error",
            message: 'Invalid token or permission denied.'
        });
    }
};

module.exports = checkJwt