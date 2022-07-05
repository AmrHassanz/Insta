const Joi = require('joi');

const signup = {
    body: Joi.object().required().keys({
        userName: Joi.string().required(),
        // userName: Joi.string().required().pattern(new RegExp()),
        email: Joi.string().email().required(),
        age: Joi.number().min(18).required(),
        gender: Joi.valid('Male', 'Female').required(),
        password: Joi.string().required(),
        cPassword: Joi.string().valid(Joi.ref('password')).required()
    })
}

const login = {
    body: Joi.object().required().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
}

const confirmEmail = {
    params: Joi.object().required().keys({
        token: Joi.string().required(),
    }),
}

const sendCode = {
    body: Joi.object().required().keys({
        email: Joi.string().email().required(),
    })
}

const forgetPassword = {
    body: Joi.object().required().keys({
        email: Joi.string().email().required(),
        code: Joi.number().required(),
        newPassword: Joi.string().required(),
        cPassword: Joi.string().valid(Joi.ref('newPassword')).required()
    })
}


module.exports = { signup, login, confirmEmail,sendCode,forgetPassword };