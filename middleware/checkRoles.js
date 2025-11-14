const HttpStatus = require('../config/httpStatus');
const Roles = require('../config/roles');

const checkRoles = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.roles)) {
            return res.status(HttpStatus.FORBIDDEN).json({
                status: "error",
                message: 'You do not have permission.'
            });
        }
        next()
    }
};

module.exports = checkRoles;