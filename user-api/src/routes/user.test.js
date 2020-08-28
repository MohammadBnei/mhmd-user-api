const supertest = require('supertest')
const app = require('../app')
const request = supertest(app)

describe('User Endpoints', () => {
    it('Should register a new user', async (done) => {
        const res = await request
            .post('/user/register')
            .send({
                'username': 'test',
                'email': 'test1@test.com',
                'password': 'test'
            })

        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('user')
        done()
    })

    it('Should login the new user', async (done) => {
        const res = await request
            .post('/user/login')
            .send({
                'username': 'test',
                'email': 'test1@test.com',
                'password': 'test'
            })

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user')
        done()
    })

    it('Should fail the login', async (done) => {
        const res = await request
            .post('/user/login')
            .send({
                'username': 'test',
                'email': 'test1@test.com',
                'password': 'fail'
            })

        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error')
        done()
    })
})