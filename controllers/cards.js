const cardModel = require('../models/cards');
const userModel = require('../models/users')

module.exports = cardsController = {

    getCards: async(req, res) => {
        try{
            const {wordLearn: token} = req.cookies;
            const {data: {username}} = token 

            if(!username){
                return res.status(400).json({err: 'token error'});
            }

            const exists = await userModel.exists(username);
            if(!exists){
                return res.status(400).json({err: 'user does not exist'});
            }

            const cards = await cardModel.getAll(username);
            res.status(200).json(cards);
        }
        catch (err){
            return res.status(400).json({err: err});
        }
    }



}