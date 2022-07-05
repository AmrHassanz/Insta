const Joi = require("joi");

// display profile validation
const displayProfile = {
    headers: Joi.object().required().keys({
        authorization: Joi.string().required()
    }).options({ allowUnknown: true })
}

// update password
const updatePassword = {
    body: Joi.object().required().keys({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required(),
        cPassword: Joi.string().valid(Joi.ref('newPassword')).required()
    })
}

module.exports = { displayProfile, updatePassword };