const Joi = require("joi");

// create post
const createPost = {
    body: Joi.object().required().keys({
        text: Joi.string(),
    })
}
// create comment
const createComment = {
    body: Joi.object().required().keys({
        text: Joi.string().required(),
    }),
    params: Joi.object().required().keys({
        id: Joi.string().min(24).max(24).required(),
    })
}
// like post
const likePost = {
    params: Joi.object().required().keys({
        id: Joi.string().min(24).max(24).required(),
    })
}
// reply on comment
const replyOnComment = {
    body: Joi.object().required().keys({
        text: Joi.string().required(),
    }),
    params: Joi.object().required().keys({
        id: Joi.string().min(24).max(24).required(),
        commentId: Joi.string().min(24).max(24).required()
    })
}

module.exports = { createPost, createComment, likePost ,replyOnComment};