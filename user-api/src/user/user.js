const Joi = require('joi')

/**
 * Takes a validator
 * returns a functions that creates an user entity
 * @param {Validator} userSchema 
 */
const buildMakeUser = ({ userSchema, hashPassword }) => (userObject) => {

    Joi.assert(userSchema, Joi.object().required())
    Joi.assert(hashPassword, Joi.function().required())

    const userWithDefault = Object.assign({
        createdOn: Date.now(),
        modifiedOn: Date.now()
    }, userObject)

    const { error, value: user } = userSchema.validate(userWithDefault)

    if (error) {
        throw new Error(error.message)
    }

    user.password = hashPassword(user.password)

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

