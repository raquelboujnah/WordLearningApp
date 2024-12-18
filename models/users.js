const db = require('../db/db');

module.exports = userModel = {
    exists: async (username) => {
        const result = await db('users').count('id').where('username', username);
        return result;
    },

    create: async (username, hashed) => {
        const result = await db('users').insert({username: username, hashed: hashed}, ['id', 'username']);
        return result;
    },

    getHash: async (username) => {
        const result = await db('users').where('username', username).select('hashed');
        return result;
    }
}