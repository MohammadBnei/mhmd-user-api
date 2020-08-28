const makeUser = require('../user')
const bcrypt = require('bcrypt')

module.exports = async () => {
    const faker = require('faker')

    faker.seed(114477)

    let users = []

    const userDb = {
        findByEmailOrUsername: async ({ email, username }) => {
            return users.find(({ email: _email, username: _username }) => email === _email || username === _username) || null
        },
        findAllUser: async () => users,
        findById: async id => users.find(({ id: _id }) => _id === id) || null,
        insert: async (user) => {
            users.push(user)
            return user
        },
        update: async (id, changes) => {
            const index = users.findIndex(({ id: _id }) => _id === id)

            if (!index) {
                throw new Error('User not found')
            }

            users.splice(index, 1, changes)
            return changes
        },
        remove: async (id) => {
            const index = users.findIndex(({ id: _id }) => _id === id)

            if (index === -1) {
                throw new Error('User not found')
            }

            users.splice(index, 1)
        }
    }

    for (let i = 0; i < 20; i++) {
        const user = makeUser({
            username: faker.name.firstName(10),
            email: faker.internet.email(),
            password: faker.random.alphaNumeric(10),
        })
        const hashPassword = await bcrypt.hash(user.getPassword(), 10)

        users.push({
            id: user.getId(),
            username: user.getUsername(),
            email: user.getEmail(),
            modifiedOn: user.getModifiedOn(),
            createdOn: user.getCreatedOn(),
            password: hashPassword,
            clearPassword: user.getPassword(),
            verifyPassword: (passwordTest) => bcrypt.compare(passwordTest, hashPassword)
        })
    }
    return [userDb, users]
}
