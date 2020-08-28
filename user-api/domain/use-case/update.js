const makeUser = require('../user')
const Joi = require('joi')
const assert = Joi.assert


const makeUpdate = ({ userDb }) => {

    assert(userDb.findById, Joi.function().required())
    assert(userDb.update, Joi.function().required())

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

        const user = makeUser({ ...existing, ...changes, modifiedOn: null })
        const updated = await userDb.update(user.getId(), {
            modifiedOn: user.getModifiedOn(),
            username: user.getUsername(),
            email: user.getEmail(),
            password: user.getPassword()
        })

        return updated
    }

    return updateUser
}

module.exports = makeUpdate