const makeUser = require('../user')
const Joi = require('joi')
const assert = Joi.assert


const makeCrudUser = ({ userDb }) => {
    assert(userDb, Joi.object({
        findByEmailOrUsername: Joi.function()
            .required(),
        insert: Joi.function()
            .required(),
        update: Joi.function()
            .required(),
        findAll: Joi.function()
            .required(),
        findById: Joi.function()
            .required(),
        remove: Joi.function()
            .required(),
    }))

    const createUser = async (userInfo) => {

        const user = await makeUser(userInfo)

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

    const findAllUser = async () => {

        const users = await userDb.findAll()

        return users

    }

    const findUser = async (userId) => {

        const user = await userDb.findById(userId)

        return user
    }

    const updateUser = async (userId, changes) => {
        assert(userId, Joi.string().required())
        assert(changes, Joi.object({
            username: Joi.string(),
            email: Joi.string(),
            password: Joi.string()
        }))

        const existing = await userDb.findById(userId)
        if (!existing) {
            throw new RangeError('User not found')
        }

        const user = await makeUser({ ...existing, ...changes, modifiedOn: null })
        const updated = await userDb.update({
            id: user.getId(),
            modifiedOn: user.getModifiedOn(),
            username: user.getUsername(),
            email: user.getEmail(),
            password: user.getPassword()
        })

        return updated
    }

    const removeUser = async (userId) => {
        assert(userId, Joi.string().required())

        return await userDb.remove(userId)
    }

    return {
        createUser,
        findAllUser,
        findUser,
        updateUser,
        removeUser,
    }
}

module.exports = makeCrudUser