const database = require('../database/models')

module.exports = {
    getAllUsers: async () => {
        return await database.User.findAll()
    },
    addBook: async (newBook) => {
        return await database.Book.create(newBook)
    },
    getABook: async (id) => {
        const theUser = await database.User.findOne({
            where: { id: Number(id) }
        })
    
        return theUser
    }
}
