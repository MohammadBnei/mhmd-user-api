const makeRemove = require('./remove')
const createMockDb = require('./__fixtures')


let remove, users, userDb

describe('Use-Case - CRUD', () => {
    beforeAll(async (done) => {
        const [userDbMock, usersList] = await createMockDb()
        userDb = userDbMock
        users = usersList
        remove = makeRemove({ userDb })

        done()
    })


    test('Should remove a user', async () => {
        const initialUser = users[13]
        const originalLength = users.length

        await remove(initialUser.id)

        expect(users.length).toBe(originalLength - 1)
        expect(await userDb.findById(initialUser.id)).toBeNull()
    })

    test('Should throw an error on wrong Id', async () => {
        await expect(remove('nemo')).rejects.toThrow('User not found')
    })

})