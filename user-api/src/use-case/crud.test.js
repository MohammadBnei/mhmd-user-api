const makeCrudUser = require('./crud')
const faker = require('faker')

faker.seed(114477)

const users = []

const userDb = {
    findByEmailOrUsername: async (email, username) => {
        return users.find(({ email: _email, username: _username }) => email === _email || username === _username) || null
    },
    findAll: async () => users,
    findById: async id => users.find(({ id: _id }) => _id === id) || null,
    insert: async (user) => {
        users.push(user)
        return user
    },
    update: async (user) => {
        const index = users.findIndex(({ id }) => id === user.id)

        if (!index) {
            throw new Error('User not found')
        }

        users.splice(index, 1, user)
        return user
    },
    remove: async (id) => {
        const index = users.findIndex(({ id: _id }) => _id === id)

        if (!index) {
            throw new Error('User not found')
        }

        users.splice(index, 1)
    }
}

const {
    createUser,
    findAllUser,
    findUser,
    updateUser,
    removeUser,
} = makeCrudUser({ userDb })

beforeAll(() => {
    for (let i = 0; i < 100; i++) {
        const user = {
            id: faker.random.uuid(),
            username: faker.name.firstName(10),
            email: faker.internet.email(),
            password: faker.random.alphaNumeric(10),
        }

        users.push(user)
    }
})

test('Should return all users', (done) => {
    findAllUser()
        .then(list => {
            expect(list.length).toBe(users.length)
            done()
        })
})

test('Should find a user', (done) => {
    const initialUser = users[5]

    findUser(initialUser.id)
        .then(updatedUser => {
            expect(updatedUser.username).toBe(initialUser.username)
            expect(updatedUser.email).toBe(initialUser.email)
            done()
        })
})

test('Should create an user', (done) => {
    const initalUser = {
        username: faker.name.firstName(10),
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(11),
    }

    createUser(initalUser)
        .then(user => {
            expect(user.id).toBeDefined()
            expect(user.email).toBe(initalUser.email)
            expect(user.username).toBe(initalUser.username)
            expect(user.initialUser).not.toBe(initalUser.username)
            done()
        })
})

test('Should update a user', (done) => {
    const initialUser = users[8]

    updateUser(initialUser.id, {
        username: 'changeTest',
    })
        .then(updatedUser => {
            expect(updatedUser.username).toBe('changeTest')
            expect(updatedUser.email).toBe(initialUser.email)
            done()
        })
})

test('Should remove a user', async (done) => {
    const initialUser = users[13]
    const originalLength = users.length

    await removeUser(initialUser.id)

    expect(users.length).toBe(originalLength - 1)

    expect(await findUser(initialUser.id)).toBeNull()

    done()
})