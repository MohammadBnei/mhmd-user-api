const Joi = require('joi')

/**
 * Takes a validator
 * returns a functions that creates an user entity
 * @param {Validator} userSchema 
 */
const buildMakeUser = ({ userSchema }) => (userObject) => {

    Joi.assert(userSchema, Joi.object())

    const userWithDefault = Object.assign({
        createdOn: Date.now(),
        modifiedOn: Date.now()
    }, userObject)

    const { error, value: user } = userSchema.validate(userWithDefault)

    if (error) {
        throw new Error(error.message)
    }

    user.clearPassword = user.password

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

