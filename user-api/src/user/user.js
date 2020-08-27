const Joi = require('joi')

/**
 * Takes a validator
 * returns a functions that creates an user entity
 * @param {Validator} userSchema 
 */
const buildMakeUser = ({ userSchema, hashPassword, idGenerator }) => async ({
    id = idGenerator.generate(),
    username,
    email,
    password,
    createdOn = Date.now(),
    modifiedOn
}) => {
    if (!modifiedOn) {
        modifiedOn = Date.now()
    }

    Joi.assert(userSchema, Joi.object().required())
    Joi.assert(hashPassword, Joi.function().required())

    const { error, value: user } = userSchema.validate({
        id,
        username,
        email,
        password,
        createdOn,
        modifiedOn
    })

    if (error) {
        throw new Error(error.message)
    }

    user.password = await hashPassword(user.password)

    return Object.freeze({
        getUsername: () => user.username,
        getEmail: () => user.email,
        getPassword: () => user.password,
        getCreatedOn: () => user.createdOn,
        getModifiedOn: () => user.modifiedOn,
        getId: () => user.id
    })
}

module.exports = buildMakeUser

