const db = require('./models')

const makeDb = async () => {
    try {
        await db.sequelize.authenticate()
        console.log('Connection to database has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }

    return db
}
module.exports = makeDb
