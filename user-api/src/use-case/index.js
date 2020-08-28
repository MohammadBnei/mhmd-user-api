const userDb = require('../data-access/')

const crudUser = require('./crud')({ userDb })
const testLogin = require('./login')({ userDb })
const register = require('./register')({ userDb })

module.exports = {
    ...crudUser,
    testLogin,
    register
}

