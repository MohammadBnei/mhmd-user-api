const Joi = require('joi')

/**
 * Takes a validator
 * returns a functions that creates an user entity
 * @param {Validator} userSchema 
 */
const buildMakeUser = ({ userSchema, idGenerator }) => ({
    id,
    username,
    email,
    password,
    createdOn = Date.now(),
    modifiedOn
}) => {
    if (!modifiedOn) {
        modifiedOn = Date.now()
    }

    if (!id) {
        id = idGenerator()
    }

    Joi.assert(userSchema, Joi.object().required())

    const user = {
        id,
        username,
        email,
        password,
        createdOn,
        modifiedOn
    }

    Joi.assert(user, userSchema)

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

