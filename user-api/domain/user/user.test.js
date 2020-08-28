const makeUser = require('.')

const userObj = {
    id: '1234',
    username: 'test',
    email: 'mohammad@test.com',
    password: 'test'
}

test('Successfully creates an User entity', async (done) => {
    const user = makeUser(userObj)

    expect(user.getId()).toBe(userObj.id)
    expect(user.getUsername()).toBe(userObj.username)
    expect(user.getEmail()).toBe(userObj.email)

    done()
})


test('Throw an error on each missing element', async (done) => {
    try {
        makeUser({
            username: 'test',
            email: 'mohammad@test.com',
            password: 'test'
        })
    } catch (error) {
        expect(error.message).toContain('"id" is required')
    }
    try {
        makeUser({
            id: '1234',
            email: 'mohammad@test.com',
            password: 'test'
        })
    } catch (error) {
        expect(error.message).toContain('"username" is required')
    }
    try {
        makeUser({
            id: '1234',
            username: 'test',
            password: 'test'
        })
    } catch (error) {
        expect(error.message).toContain('"email" is required')
    }
    try {
        makeUser({
            id: '1234',
            username: 'test',
            email: 'mohammad@test.com',
        })
    } catch (error) {
        expect(error.message).toContain('"password" is required')
    }
    done()
})

test('Throw an error when trying to modify properties directly', async (done) => {
    'use strict'
    const user = makeUser(userObj)

    try {
        user.id = null
    } catch (error) {
        expect(error.message).toBe('Cannot add property id, object is not extensible')
    }

    done()
})