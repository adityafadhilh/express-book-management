const jwt = require('jsonwebtoken');

const checkJwt = (req, res, next) => {
    try {
        const token = jwt.verify(req.headers['authorization'], process.env.JWT_SECRET);
        req.user = {
            ...token._doc
        };
        next()
    } catch (error) {
        return res.status(401).json({
            statusCode: 'restricted',
            message: 'Invalid token or permission denied.'
        })
    }
};

module.exports = checkJwt