const userModel = require('../models/users')

const {assert} = require('chai')

describe('usersdb', () => {
    let startTime;

    before(async() => {
        startTime = new Date().toLocaleString();
    })

    after(async() => {
        await userModel.deleteAfter(startTime);
    })

    it('sanity', () => {});

})

