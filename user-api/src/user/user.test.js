const makeUser = require('./')

const userObj = {
    id: '1234',
    username: 'test',
    email: 'mohammad@test.com',
    password: 'test'
}

test('Successfully creates an User entity', () => {
    const user = makeUser(userObj)

    expect(user.getId()).toBe(userObj.id)
    expect(user.getUsername()).toBe(userObj.username)
    expect(user.getEmail()).toBe(userObj.email)
})


test('Throw an error on each missing element', () => {
    try {
        makeUser({
            username: 'test',
            email: 'mohammad@test.com',
            password: 'test'
        })
    } catch (error) {
        expect(error.message).toBe('"id" is required')
    }
    try {
        makeUser({
            id: '1234',
            email: 'mohammad@test.com',
            password: 'test'
        })
    } catch (error) {
        expect(error.message).toBe('"username" is required')
    }
    try {
        makeUser({
            id: '1234',
            username: 'test',
            password: 'test'
        })
    } catch (error) {
        expect(error.message).toBe('"email" is required')
    }
    try {
        makeUser({
            id: '1234',
            username: 'test',
            email: 'mohammad@test.com',
        })
    } catch (error) {
        expect(error.message).toBe('"password" is required')
    }
})

test('Throw an error when trying to modify properties directly', () => {
    'use strict'
    const user = makeUser(userObj)

    try {
        user.id = null
    } catch (error) {
        expect(error.message).toBe('Cannot add property id, object is not extensible')
    }
})