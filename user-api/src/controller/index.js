const { register: registerService, find: findService, testLogin: loginService } = require('../../domain/use-case/')

module.exports = {
    register: require('./register')({ registerService }),
    login: require('./login')({ loginService }),
    find: require('./find')({ findService })
}