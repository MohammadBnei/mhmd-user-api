const userDb = {
    findByEmailOrUsername: (username) => {
        if (username === 'fail') {
            return {
                username: 'fail'
            }
        }

        return null
    },
    insert: (user) => user
}

const userObj = {
    id: '1234',
    username: 'test',
    email: 'mohammad@test.com',
    password: 'test'
}

const register = require('./register')({ userDb })

test('Should register the user and return it', (done) => {
    register(userObj)
        .then(user => {
            expect(user.username).toBe(userObj.username)
            expect(user.email).toBe(userObj.email)
            done()
        })
})

test('Should find the already existing user, and return it', (done) => {
    register({
        ...userObj,
        username: 'fail'
    })
        .then(user => {
            expect(user.username).toBe('fail')
            done()
        })
})
