const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    id: Joi.string()
        .id()
        .required(),

    email: Joi.string()
        .email()
        .required(),

    createdOn: Joi.date(),
    modifiedOn: Joi.date(),
})

module.exports = userSchema
