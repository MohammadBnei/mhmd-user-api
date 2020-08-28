const bcrypt = require('bcrypt')

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        // attributes
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        modifiedOn: {
            type: Sequelize.DATE
        },
        createdOn: {
            type: Sequelize.DATE
        },
        validated: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            set(val) {
                const hash = bcrypt.hashSync(val, 10)
                this.setDataValue('password', hash)
            }
        }
    })

    User.prototype.verifyPassword = function (enteredPassword) {
        return bcrypt.compare(enteredPassword, this.password)
    }

    return User
}