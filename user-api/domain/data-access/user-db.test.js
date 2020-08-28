const makeDb = require('../../database')
const faker = require('faker')
const makeUser = require('../user')

faker.seed(336699)

let userDb
let users = []
let db

beforeAll(async (done) => {
    try {
        db = await makeDb()
        await db.sequelize.sync({ force: true })

        for (let i = 0; i < 20; i++) {
            const user = makeUser({
                username: `${faker.name.firstName(10)}${faker.name.lastName(10)}`,
                email: faker.internet.email(),
                password: faker.random.alphaNumeric(10),
            })

            users.push(db.User.create({
                id: user.getId(),
                username: user.getUsername(),
                email: user.getEmail(),
                modifiedOn: user.getModifiedOn(),
                createdOn: user.getCreatedOn(),
                password: user.getPassword()
            }))
        }

        users = await Promise.all(users)

        userDb = await require('./user-db')({ makeDb: async () => db })

        done()
    } catch (error) {
        console.log(error)
        setTimeout(() => {
            process.exit(1)
        }, 1000)
    }

})

afterAll(async (done) => {
    await db.User.destroy({
        truncate: true
    })
    await db.sequelize.close()
    done()
})

test('Should find the user by id', async (done) => {
    const initialUser = users[7]

    const foundUser = await userDb.findById(initialUser.id)

    expect(foundUser).toBeDefined()
    expect(foundUser.email).toBe(initialUser.email)

    done()
})

test('Should find the user by email', async (done) => {
    const initialUser = users[8]

    const foundUser = await userDb.findByEmailOrUsername({ email: initialUser.email })

    expect(foundUser).toBeDefined()
    expect(foundUser.username).toBe(initialUser.username)

    done()
})

test('Should find the user by username', async (done) => {
    const initialUser = users[8]

    const foundUser = await userDb.findByEmailOrUsername({ username: initialUser.username })

    expect(foundUser).toBeDefined()
    expect(foundUser.username).toBe(initialUser.username)

    done()
})

test('Should NOT find the user by email', async (done) => {
    const notFoundUser = await userDb.findByEmailOrUsername({ email: 'FAILING' })

    expect(notFoundUser).toBeNull()

    done()
})

test('Should NOT find the user by username', async (done) => {
    const notFoundUser = await userDb.findByEmailOrUsername({ username: 'FAILING' })

    expect(notFoundUser).toBeNull()

    done()
})


test('Should return all users', async (done) => {
    const dbUsers = await userDb.findAllUser()

    expect(dbUsers.length).toBe(users.length)
    done()
})

test('Should insert a user to the db', async (done) => {
    const user = makeUser({
        username: 'jackNickolson',
        password: 'whereisjhonny',
        email: 'shinnig@johnny.com'
    })

    const newUser = {
        id: user.getId(),
        username: user.getUsername(),
        email: user.getEmail(),
        modifiedOn: user.getModifiedOn(),
        createdOn: user.getCreatedOn(),
        password: user.getPassword()
    }

    await userDb.insert(newUser)

    const dbUser = await userDb.findById(newUser.id)

    expect(dbUser.username).toBe(newUser.username)

    done()
})

test('Should update a user', async (done) => {
    const updatedUser = users[18]

    await userDb.update(updatedUser.id, {
        username: 'TieUnMonstre'
    })

    const dbUser = await userDb.findById(updatedUser.id)

    expect(dbUser.username).toBe('TieUnMonstre')

    done()
})

test('Should verify a user\'s password', async (done) => {
    const user = makeUser({
        username: 'neo',
        password: 'whereisjhonny',
        email: 'neo@matrix.com'
    })

    const newUser = {
        id: user.getId(),
        username: user.getUsername(),
        email: user.getEmail(),
        modifiedOn: user.getModifiedOn(),
        createdOn: user.getCreatedOn(),
        password: user.getPassword()
    }

    const dbUser = await userDb.insert(newUser)

    const test = await dbUser.verifyPassword('whereisjhonny')

    expect(dbUser.username).toBe('neo')
    expect(test).toBe(true)

    done()
})

test('Should remove a user', async (done) => {
    const removedUser = users[14]

    await userDb.remove(removedUser.id)

    const dbUser = await userDb.findById(removedUser.id)

    expect(dbUser).toBeNull()

    done()
})