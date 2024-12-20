const cardModel = require('../models/cards');
const userModel = require('../models/users')
const {getData} = require('./token')

module.exports = cardsController = {

    getCards: async(req, res) => {
        try{
            handleCookie(req, async ({username, err}) => {
                if(err){
                    return res.status(400).json(err);
                }

                const cards = await cardModel.getAll(username);
                res.status(200).json(cards);
            })
        }
        catch (err){
            return res.status(400).json({err: String(err)});
        }
    },

    create: async(req, res) => {
        try{
            handleCookie(req, async({username, err}) => {
                const {front, back, index} = req.body;
                // console.log('front', front, 'back', back, 'username', username, 'index', index);
                const info = await cardModel.create(username, front, back, index);
                res.status(200).json(info);
            })
        }
        catch (err){
            return res.status(400).json({err: String(err)});
        }
    }


}

async function handleCookie(req, callback){
    try{
        const {wordLearn: token} = req.cookies;
        const {username} = getData(token)
        if(!username){
            callback({err: 'token error'});
            return
        }
        const exists = await userModel.exists(username);
        if(!exists){
            return res.status(400).json({err: 'user does not exist'});
        }
        await callback({username: username});
    }
    catch (err){
        callback({err: String(err)});
    }
}