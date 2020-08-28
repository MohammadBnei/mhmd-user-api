const Joi = require('joi')
const assert = Joi.assert


const makeFind = ({ userDb }) => {
    assert(userDb.findAllUser, Joi.function().required())
    assert(userDb.findById, Joi.function().required())

    const findAllUser = async () => {

        const users = await userDb.findAllUser()

        return users

    }

    const findUserById = async (userId) => {

        const user = await userDb.findById(userId)

        return user
    }

    return {
        findAllUser,
        findUserById,
    }
}

module.exports = makeFind