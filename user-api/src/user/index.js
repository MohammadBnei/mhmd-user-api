const userSchema = require('./validation')
const bcrypt = require('bcrypt')

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(password, salt)

    return hash
}

const makeUser = require('./user')({
    userSchema,
    hashPassword
})

module.exports = makeUser
