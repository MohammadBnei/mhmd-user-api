const makeUser = require('../user')
const Joi = require('joi')

const makeRegister = ({ userDb }) => async (userInfo) => {
    Joi.assert(userDb, Joi.object({
        findByEmailOrUsername: Joi.function()
            .required(),
        insert: Joi.function()
            .required()
    }))
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

module.exports = makeRegister
