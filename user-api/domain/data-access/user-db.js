const { Op } = require('sequelize')

/**
 * 
 * @param {makdeDb}  
 */
const makeUserdb = ({ makeDb }) => {
    async function findAllUser() {
        const { User } = await makeDb()
        return User.findAll()
    }

    async function findById(id) {
        const { User } = await makeDb()
        return User.findByPk(id)
    }

    async function findByEmailOrUsername({ email = '', username = '' }) {
        const { User } = await makeDb()
        const query = {
            where: {
                [Op.or]: [
                    { email },
                    { username }
                ]
            }
        }
        return User.findOne(query)
    }

    async function insert(user) {
        const { User } = await makeDb()
        return User.create(user)
    }

    async function update(id, changes) {
        const { User } = await makeDb()
        const query = {
            where: {
                id
            }
        }
        return User.update(changes, query)
    }
    async function remove(id) {
        const { User } = await makeDb()
        const query = {
            where: {
                id
            }
        }
        return User.destroy(query)
    }


    return Object.freeze({
        findById,
        findAllUser,
        findByEmailOrUsername,
        insert,
        update,
        remove,
    })
}

module.exports = makeUserdb
