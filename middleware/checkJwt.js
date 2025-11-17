const jwt = require('jsonwebtoken');
const HttpStatus = require('../config/httpStatus');

const checkJwt = (req, res, next) => {
    console.log('JWT CHECK');
    try {
        const header = req.headers['authorization'] || req.headers['Authorization'];
        if (!header) {
            return res.status(HttpStatus.FORBIDDEN).json({ status: "error", message: 'Missing authorization header' });
        }
        const token = header.startsWith('Bearer ') ? header.slice(7) : header;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            _id: payload._doc._id || payload._doc.id,
            roles: payload._doc.roles,
            email: payload._doc.email
        }

        // jwt.verify(req.headers['authorization'], process.env.JWT_SECRET, (err, token) => {
        //     if (err) throw err;
        //     if (token) {
        //         req.user = {
        //             ...token._doc
        //         };
        //         next();
        //     }
        // });
        next()
    } catch (error) {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: "error",
            message: 'Invalid token or permission denied.'
        });
    }
};

module.exports = checkJwt