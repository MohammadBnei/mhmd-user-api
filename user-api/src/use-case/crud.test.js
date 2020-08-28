const makeCrudUser = require('./crud')
const createMockDb = require('./__fixtures')


let crudUser, users

describe('Use-Case - CRUD', () => {
    beforeAll(async (done) => {
        const [userDb, usersList] = await createMockDb()
        users = usersList
        crudUser = makeCrudUser({ userDb })

        done()
    })

    test('Should return all users', (done) => {
        crudUser.findAllUser()
            .then(list => {
                expect(list.length).toBe(users.length)
                done()
            })
    })

    test('Should find a user', (done) => {
        const initialUser = users[5]

        crudUser.findUser(initialUser.id)
            .then(updatedUser => {
                expect(updatedUser.username).toBe(initialUser.username)
                expect(updatedUser.email).toBe(initialUser.email)
                done()
            })
    })

    test('Should create an user', (done) => {
        const initalUser = {
            username: 'kourosh',
            email: 'kourosh@test.com',
            password: 'farvahad19',
        }

        crudUser.createUser(initalUser)
            .then(user => {
                expect(user.id).toBeDefined()
                expect(user.email).toBe(initalUser.email)
                expect(user.username).toBe(initalUser.username)
                expect(user.initialUser).not.toBe(initalUser.username)
                done()
            })
    })

    test('Should update a user', (done) => {
        const initialUser = { ...users[8] }

        crudUser.updateUser(initialUser.id, {
            username: 'changeTest',
        })
            .then(updatedUser => {
                expect(updatedUser.username).toBe('changeTest')
                expect(updatedUser.email).toBe(initialUser.email)
                expect(updatedUser.modifiedOn).toBeGreaterThan(initialUser.modifiedOn)
                done()
            })
    })

    test('Should remove a user', async (done) => {
        const initialUser = users[13]
        const originalLength = users.length

        await crudUser.removeUser(initialUser.id)

        expect(users.length).toBe(originalLength - 1)

        expect(await crudUser.findUser(initialUser.id)).toBeNull()

        done()
    })

})