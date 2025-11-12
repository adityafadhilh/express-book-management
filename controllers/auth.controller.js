const userServices = require('../services/user.services');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const body = req.body;
    const findOne = await userServices.findByEmail(body.email);

    if (!findOne) {
        return res.status(404).json({
            statusCode: 'failed_to_signin',
            message: 'Wrong email or password'
        });
    }

    if (!bcrypt.compareSync(body.password, findOne.password)) {
        return res.status(404).json({
            statusCode: 'failed_to_signin',
            message: 'Wrong email or password'
        });
    }

    const token = jwt.sign({...findOne}, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });

    return res.status(200).json({
        data: findOne,
        access_token: token,
        message: 'Login Successful'
    });
};

const register = async (req, res) => {
    try {
        console.log('REGISTER USER');
        const body = req.body;
        const user = await userServices.create(body);
        return res.json({
            data: user
        });
    } catch (errors) {
        return res.json({
            errors
        });
    }
};

module.exports = {
    login,
    register,
}