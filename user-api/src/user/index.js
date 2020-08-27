const userSchema = require('./validation')
const bcrypt = require('bcrypt')
const shortid = require('shortid')


const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(password, salt)

    return hash
}

const makeUser = require('./user')({
    userSchema,
    hashPassword,
    idGenerator: shortid
})

module.exports = makeUser
