const makeUser = require('../user')
const Joi = require('joi')

const makeRegister = ({ userDb }) => async (userInfo) => {
    Joi.assert(userDb.findByEmailOrUsername, Joi.function().required())
    Joi.assert(userDb.insert, Joi.function().required())

    const user = makeUser(userInfo)

    const exists = await userDb.findByEmailOrUsername({ email: user.getEmail(), username: user.getUsername() })
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

module.exports = makeRegister
