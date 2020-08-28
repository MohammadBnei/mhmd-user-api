const Joi = require('joi')
const { Op } = require('sequelize')

/**
 * 
 * @param {makdeDb}  
 */
const makeUserdb = async ({ makeDb }) => {
    Joi.assert(makeDb, Joi.function().required())

    const { User } = await makeDb()

    function findAllUsers() {
        return User.findAll()
    }

    function findById(id) {
        return User.findByPk(id)
    }

    function findByEmailOrUsername({ email = '', username = '' }) {
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

    function insert(user) {
        return User.create(user)
    }

    function update(id, changes) {
        const query = {
            where: {
                id
            }
        }
        return User.update(changes, query)
    }
    function remove(id) {
        const query = {
            where: {
                id
            }
        }
        return User.destroy(query)
    }


    return Object.freeze({
        findById,
        findAllUsers,
        findByEmailOrUsername,
        insert,
        update,
        remove,
    })
}

module.exports = makeUserdb
