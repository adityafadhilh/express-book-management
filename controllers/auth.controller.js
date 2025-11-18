const userServices = require('../services/user.services');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpStatus = require('../config/httpStatus');
const CustomError = require('../helpers/customError');

const login = async (req, res, next) => {
    try {
        const body = req.body;
        const findOne = await userServices.findByEmail(body.email);

        if (!findOne) {
            throw new CustomError(HttpStatus.NOT_FOUND, "User not found");
        }

        if (!bcrypt.compareSync(body.password, findOne.password)) {
            throw new CustomError(HttpStatus.UNAUTHORIZED, "Wrong email or password");
        }

        const token = jwt.sign({ 
            _id: findOne._id,
            email: findOne.email,
            roles: findOne.roles,
         }, process.env.JWT_SECRET, {
            expiresIn: 1800
        });

        const refreshToken = jwt.sign({ 
            _id: findOne._id,
            email: findOne.email,
            roles: findOne.roles,
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        // const addRefreshToken = await userServices.update(findOne._id, {
        //     refreshToken: bcrypt.hashSync(refreshToken, 10)
        // });

        // if (!addRefreshToken) {
        //     throw new CustomError(HttpStatus.BAD_REQUEST, "Failed to create refresh token on db");
        // }

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict"
        });

        return res.status(200).json({
            data: {
                _id: findOne._id,
                email: findOne.email,
                firstName: findOne.firstName,
                lastName: findOne.lastName,
                roles: findOne.roles
            },
            access_token: token,
            // refresh_token: refreshToken,
            message: 'Login Successful'
        });
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    try {
        console.log('REGISTER USER');
        const body = req.body;
        const user = await userServices.create(body);
        return res.json({
            data: user
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const logout = (req, res, next) => {
    try {
        console.log('Logout');
        res.clearCookie('refreshToken');
        return res.json({
            message: 'Successfully signed out'
        })
    } catch (error) {
        next(error)
    }
};

const refresh = (req, res, next) => {
    try {
        const refreshToken = jwt.verify(req.cookies['refreshToken'], process.env.JWT_SECRET);

        const newAccessToken = jwt.sign({...refreshToken}, process.env.JWT_SECRET);

        const newRefreshToken = jwt.sign({...refreshToken}, process.env.JWT_SECRET);

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict"
        });
        return res.json({
            access_token: newAccessToken,
            message: 'Token refreshed'
        });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    login,
    register,
    logout,
    refresh
};