const createMockDb = require('./__fixtures')

let testLogin, users

beforeAll(async (done) => {
    const [userDb, usersList] = await createMockDb()
    users = usersList
    testLogin = require('./login')({ userDb })

    done()
})
test('Should find the user by email, compare password and return the user', (done) => {
    const initialUser = users[1]

    testLogin({
        email: initialUser.email,
        password: initialUser.clearPassword
    })
        .then(user => {
            expect(user.username).toBe(initialUser.username)
            expect(user.email).toBe(initialUser.email)
            done()
        })
})

test('Should find the user by email, compare password and return the user', (done) => {
    const initialUser = users[1]
    testLogin({
        username: initialUser.username,
        password: initialUser.clearPassword
    })
        .then(user => {
            expect(user.username).toBe(initialUser.username)
            expect(user.email).toBe(initialUser.email)
            done()
        })
})

test('Should find the user by username, fail at comparing passwords', async () => {
    const initialUser = users[2]

    await expect(testLogin({
        username: initialUser.username,
        password: 'fail'
    })).rejects.toThrow('Wrong password')
})

test('Should not find the user', async () => {
    await expect(testLogin({
        username: 'failing',
        password: 'fail'
    })).rejects.toThrow('User not found')
})


