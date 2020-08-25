const makeUser = require('../user')
const Joi = require('joi')

const makeRegister = ({ userDb }) => async (userInfo) => {
    Joi.assert(userDb, Joi.object({
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



}