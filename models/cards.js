const db = require('../db/db')

module.exports = cardModel = {

    getAll: async(username) => {
        const cards = await db('cards')
            .join('users', 'users.id', 'cards.user_id')
            .where('username', username)
            .orderBy('cards.created', 'desc')
            .select('cards.id', 'front', 'back', 'cards.created');
        // console.log(cards);
        return cards;
    },

    create: async(username, front, back, created) => {
        const [result] = await db('cards')
            .insert({
                front: front, 
                back: back, 
                user_id: db('users').where('username', username).select('id').first(),
                created: created || new Date().toISOString()
            }, ['id', 'front', 'back', 'created'])
        // console.log('created: ', created, 'as', result.created);
        return result;
    },

    update: async(cardId, front, back) => {
        
    },

    delete: async(cardId) => {
        const [result] = await db('cards').where('id', cardId).del('id');
        return result;
    },

    deleteAfter: async(timestamp) => {
        const result = await db('cards').where('created', '>=', timestamp).del('id');
        return result;
    }
}