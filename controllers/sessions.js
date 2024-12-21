const cardModel = require('../models/card');

const sessionController = {

    sessions: {},

    create: async (username, range) => {
        console.log('sessionController.create', username, range);
        let cards;
        if(range.length == 0){
            cards = await cardModel.getAll();
        }
        else {
            cards = await cardModel.getRange(range);
        }
    },

    remove: (username) => {

    },

    handleAnswer: async() => {}

}

module.exports = sessionController;