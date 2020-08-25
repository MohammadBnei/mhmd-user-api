const makeUser = require('../user')
const Joi = require('joi')
const assert = Joi.assert

const makeCreateUser = ({ userDb }) => async (userInfo) => {
    assert(userDb, Joi.object({
        findByEmailOrUsername: Joi.function()
            .required(),
        insert: Joi.function()
            .required()
    }))
    const user = makeUser(userInfo)

    const exists = await userDb.findByEmailOrUsername(user.getEmail(), user.getUsername())
    if (exists) {
        return exists
    }

    return userDb.insert({
        id: user.getId(),
        username: user.getUsername(),
        email: user.getEmail(),
        modifiedOn: user.getModifiedOn(),
        createdOn: user.getCreatedOn(),
        password: user.getPassword(),
    })

}

const makeFindUsers = ({ userDb }) => async () => {
    assert(userDb, Joi.object({
        findAll: Joi.function()
            .required()
    }))

    const users = await userDb.findAll()

    return users

}

const makeFindUser = ({ userDb }) => async (userId) => {
    assert(userDb, Joi.object({
        findById: Joi.function()
            .required()
    }))

    const user = await userDb.findById(userId)

    return user
}

const makeUpdateUser = ({ userDb }) => async (userId, ...changes) => {
    assert(userDb, Joi.object({
        findById: Joi.function()
            .required(),
        update: Joi.function()
            .required(),
    }))
    assert(userId, Joi.string().required())

    const existing = await userDb.findById(userId)
    if (!existing) {
        throw new RangeError('User not found')
    }

    const user = makeUser({ ...existing, ...changes, modifiedOn: null })
    const updated = await userDb.update({
        id: user.getId(),
        modifiedOn: user.getModifiedOn(),
        username: user.getUsername(),
        email: user.getEmail(),
        password: user.getPassword()
    })

    return updated
}

const makeDeleteUser = ({ userDb }) => async (userId) => {
    assert(userDb, Joi.object({
        findById: Joi.function()
            .required(),
        delete: Joi.function()
            .required(),
    }))
    assert(userId, Joi.string().required())

    return await userDb.delete(userId)
}

module.exports = {
    makeCreateUser,
    makeFindUsers,
    makeFindUser,
    makeUpdateUser,
    makeDeleteUser,
}
