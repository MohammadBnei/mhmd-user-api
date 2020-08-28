const Joi = require('joi')
const { compare } = require('bcrypt')

const assert = Joi.assert

const makeTestLogin = ({ userDb }) => async ({
    username,
    email,
    password
}) => {
    assert(userDb.findByEmailOrUsername, Joi.function().required())

    assert(password, Joi.string().required())
    assert({ username, email }, Joi.object({
        username: Joi.string(),
        email: Joi.string().email()
    }))

    const user = await userDb.findByEmailOrUsername({ email, username })
    if (!user) {
        throw new Error('User not found')
    }

    const test = await compare(password, user.password)

    return test && user
}

module.exports = makeTestLogin
