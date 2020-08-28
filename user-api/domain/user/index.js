const userSchema = require('./validation')
const cuid = require('cuid')

const makeUser = require('./user')({
    userSchema,
    idGenerator: cuid
})

module.exports = makeUser
