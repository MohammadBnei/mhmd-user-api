const createMockDb = require('./__fixtures')

let register, users

beforeAll(async (done) => {
    const [userDb, usersList] = await createMockDb()
    users = usersList
    register = require('./register')({ userDb })

    done()
})

test('Should register the user and return it', (done) => {
    const initialUser = {
        username: 'kourosh',
        email: 'kourosh@test.com',
        password: 'farvahad19',
    }

    register(initialUser)
        .then(user => {
            expect(user.username).toBe(initialUser.username)
            expect(user.email).toBe(initialUser.email)
            done()
        })
})

test('Should throw an error on already existing email', (done) => {
    const initialUser = { ...users[4] }
    initialUser.username = 'noUsername'


    register(initialUser)
        .catch(error => {
            expect(error.message).toBe(`Email "${initialUser.email}" already taken`)
            done()
        })
})

test('Should throw an error on already existing username', (done) => {
    const initialUser = { ...users[4] }
    initialUser.email = 'noEmail@gmail.com'


    register(initialUser)
        .catch(error => {
            expect(error.message).toBe(`Username "${initialUser.username}" already taken`)
            done()
        })
})
