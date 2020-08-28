const makeUserdb = require('./user-db')
const makeDb = require('../../database')

const userDb = makeUserdb({ makeDb })

module.exports = userDb
