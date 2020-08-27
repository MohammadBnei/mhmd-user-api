const makeUser = require('../user')

const userDb = {
    findByEmailOrUsername: async (email, username) => {
        if (email === userObj.email) {
            return { ...userObj, password: (await makeUser(userObj)).getPassword() }
        }

        const user2 = {
            ...userObj,
            password: 'test2',
        }

        if (username === user2.username) {
            return { ...user2, password: (await makeUser(user2)).getPassword() }
        }

        return null
    }
}

const userObj = {
    id: '1234',
    username: 'test',
    email: 'mohammad@test.com',
    password: 'test'
}

const testLogin = require('./login')({ userDb })

test('Should find the user, compare password and return the user', (done) => {
    testLogin({
        email: userObj.email,
        password: userObj.password
    })
        .then(user => {
            expect(user.username).toBe(userObj.username)
            expect(user.email).toBe(userObj.email)
            done()
        })
})

test('Should find the user, fail at comparing passwords', (done) => {
    testLogin({
        username: userObj.username,
        password: 'fail'
    })
        .then(user => {
            expect(user).toBe(false)
            done()
        })
})

test('Should not find the user', (done) => {
    testLogin({
        username: 'failing',
        password: 'fail'
    })
        .catch(error => {
            expect(error.message).toBe('User not found')
            done()
        })
})


