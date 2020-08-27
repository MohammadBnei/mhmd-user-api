const Joi = require('joi')

/**
 * 
 * @param {makdeDb}  
 */
const makeUserdb = async ({ makeDb }) => {
    Joi.assert(makeDb, Joi.function().required())

    const db = await makeDb()

    async function findAll() {
        return await db.findAll()
    }

    async function findById(id) {
        return await db.findByPk(id)
    }

    async function insert(user) {
        return await db.create(user)
    }

    return Object.freeze({
        findByEmailOrUsername,
        insert,
        findById,
        findAll,
        remove,
    })
}

module.exports = makeUserdb
