const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .required(),

    id: Joi.string()
        .id()
        .required(),

    email: Joi.string()
        .email()
        .required(),

    createdOn: Joi.date().timestamp(),
    modifiedOn: Joi.date().timestamp().required(),
})

module.exports = userSchema
