const {hash} = require('../controllers/hashing');
const db = require('../db/db')
const userModel = require('../models/users')
const cardModel = require('../models/cards')
const userController = require('../controllers/user');

exports.seed = async function (db) {
    const username = 'john.doe'
    const hashed = await hash('1234')
    await userModel.create(username, hashed);

    await cardModel.create(username, 'front1', 'back1');
    await cardModel.create(username, 'front2', 'back2');
    await cardModel.create(username, 'front3', 'back3');
}