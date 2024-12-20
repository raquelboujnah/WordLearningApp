const {deleteAfter: deleteUsersAfter} = require('../models/users');
const {deleteAfter: deleteCardsAfter} = require('../models/cards');
const app = require('../app')

const request = require('supertest')
const {assert} = require('chai')

describe('cards crud', () => {
    let startTime, token, order;  

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
        assert.isOk(response.body.created)
        const {id, front, back, created, index} = response.body.created;
        assert.isOk(id)
        assert.equal(front, 'front')
        assert.equal(back, 'back')
        assert.isOk(created);
        assert.equal(index, 0)
    })

    it('create more', async() => {
        const responses = await Promise.all(
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
        assert.equal(responses.length, 3);
        const idxs = responses.map(r => r.body.created.index);
        assert.equal(Math.min(...idxs), 1)
        assert.equal(Math.max(...idxs), 3);
    })

    it('create new card at the beginning', async() => {
        const newCard = {
            front: "I'm the first one!",
            back: 'back',
            index: 0
        }

        const response = await request(app)
            .post('/cards')
            .set('Cookie', [`wordLearn=${token}`])
            .send(newCard)
        
        // console.log(response.body);
        const {updated, created} = response.body;
        assert.isOk(updated)
        assert.isOk(created)

        const idxs = updated.map(c => c.index);

        assert.equal(created.index, 0)
        assert.equal(Math.min(...idxs), 1)
        assert.equal(Math.max(...idxs), 4)
    })

})