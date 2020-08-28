const makeUpdate = require('./update')
const createMockDb = require('./__fixtures')

let update, users

describe('Use-Case - Update', () => {
    beforeAll(async (done) => {
        const [userDb, usersList] = await createMockDb()
        users = usersList
        update = makeUpdate({ userDb })

        done()
    })

    test('Should update a user', (done) => {
        const initialUser = { ...users[8] }

        update(initialUser.id, {
            username: 'changeTest',
        })
            .then(updatedUser => {
                expect(updatedUser.username).toBe('changeTest')
                expect(updatedUser.email).toBe(initialUser.email)
                expect(updatedUser.modifiedOn).toBeGreaterThan(initialUser.modifiedOn)
                done()
            })
    })

    test('Should throw an error on wrong Id', async () => {
        await expect(update('nemo', {
            username: 'changeTest',
        })).rejects.toThrow('User not found')
    })

})