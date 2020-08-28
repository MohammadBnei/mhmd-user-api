const Joi = require('joi')
const assert = Joi.assert


const makeRemove = ({ userDb }) => {
    assert(userDb.remove, Joi.function().required())

    const removeUser = async (userId) => {
        assert(userId, Joi.string().required())

        return await userDb.remove(userId)
    }

    return removeUser
}

module.exports = makeRemove