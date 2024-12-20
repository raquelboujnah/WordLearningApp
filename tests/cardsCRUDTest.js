const {deleteAfter: deleteUsersAfter} = require('../models/users');
const {deleteAfter: deleteCardsAfter} = require('../models/cards');
const app = require('../app')

const request = require('supertest')
const {assert} = require('chai')

describe('cards crud', () => {
    let startTime, token;  

    before(() => {
        startTime = new Date().toISOString();
    })

    after(async() => {
        await deleteCardsAfter(startTime);
        await deleteUsersAfter(startTime);
    })

    it('new user', async() => {
        const response = await request(app)
            .post('/registration')
            .send({
                username: 'alice',
                password: '1234'
            });
        assert.equal(response.status, 200)
        assert.isOk(response.body);
    })

    it('handling token', async() => {
        const response = await request(app)
            .post('/login')
            .send({
                username: 'alice',
                password: '1234'
            });

        assert.equal(response.status, 200);

        const cookies = response.headers['set-cookie'];
        const cookie = cookies.find(c => c.startsWith('wordLearn='))
        token = cookie.substring(10);
        assert.isOk(token);
    })

    it('get cards (alice has none)', async() => {
        const response = await request(app)
            .get('/cards')
            .set('Cookie', [`wordLearn=${token}`]);
        assert.equal(response.status, 200);
        const cards = response.body;
        assert.equal(cards.length, 0);
    })

    it('create', async() => {
        const newCard = {front: 'front', back: 'back'};

        const response = await request(app)
            .post('/cards')
            .set('Cookie', [`wordLearn=${token}`])
            .send(newCard);

        assert.equal(response.status, 200); 
        const {id, front, back, created} = response.body;
        assert.isOk(id)
        assert.equal(front, 'front')
        assert.equal(back, 'back')
        assert.isOk(created);
    })

    it('create more', async() => {
        const info = await Promise.all(
            [
                {front: 'front1', back: 'back1'},
                {front: 'front2', back: 'back2'},
                {front: 'front3', back: 'back3'},
            ].map(async card => 
                await request(app)
                    .post('/cards')
                    .set('Cookie', [`wordLearn=${token}`])
                    .send(card)
            )
        )

        assert.equal(info.length, 3);
    })

})