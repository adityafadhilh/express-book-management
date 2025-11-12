const Roles = require('../helpers/roles');

const checkRoles = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.roles)) {
            return res.status(403).json({
                statusCode: 'restricted',
                message: 'You do not have permission.'
            })
        }
        next()
    }
};

module.exports = checkRoles;