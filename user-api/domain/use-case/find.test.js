const makeFind = require('./find')
const createMockDb = require('./__fixtures')


let find, users

describe('Use-Case - CRUD', () => {
    beforeAll(async (done) => {
        const [userDb, usersList] = await createMockDb()
        users = usersList
        find = makeFind({ userDb })

        done()
    })

    test('Should return all users', (done) => {
        find.findAllUser()
            .then(list => {
                expect(list.length).toBe(users.length)
                done()
            })
    })

    test('Should find a user', (done) => {
        const initialUser = users[5]

        find.findUserById(initialUser.id)
            .then(updatedUser => {
                expect(updatedUser.username).toBe(initialUser.username)
                expect(updatedUser.email).toBe(initialUser.email)
                done()
            })
    })

    test('Should NOT find a user', (done) => {
        find.findUserById('not existing')
            .then(found => {
                expect(found).toBeNull()
                done()
            })
    })
})