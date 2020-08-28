const userDb = require('../data-access')

const find = require('./find')({ userDb })
const update = require('./update')({ userDb })
const remove = require('./remove')({ userDb })
const testLogin = require('./login')({ userDb })
const register = require('./register')({ userDb })

module.exports = {
    find,
    update,
    remove,
    testLogin,
    register
}

