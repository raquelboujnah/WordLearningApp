const cardModel = require('../models/card');

const sessionController = {

    sessions: {},

    create: async (username, range, socketId, ) => {
        console.log('sessionController.create', username, range);
        let cards;
        if(range.length == 0){
            cards = await cardModel.getAll();
        }
        else {
            cards = await cardModel.getRange(range);
        }

        const session = {
            idx: 0,
            getCurrent: () => cards[session.idx],
            toNext: () => {
                session.idx = (session.idx + 1) % cards.length;
                return cards[session.idx];
            }
        }

        sessionController.sessions[socketId] = session;
    },

    remove: ({socketId, username}) => {
        if(socketId){
            delete sessionController.sessions.socketId;
        }
        else {
            sessionController.sessions = 
                sessionController.sessions.filter(({user}) => user != username);
        }
    },

    handleAnswer: (socketId, answer) => {
        return sessionController.sessions[socketId].toNext();
    }
}

module.exports = sessionController;