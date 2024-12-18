const userModel = require('../models/users')
const {hash, compare} = require('./hashing')

module.exports = userController = {

    getRegistrationPage: (req, res) => {
        throw new Error()
    },

    getLoginPage: (req, res) => {
        throw new Error()
    },

    getMainPage: async(req, res) => {
        throw new Error()
    },

    handleRegistration: async(req, res) => {
        const {username, password} = req.body;
        const exists = await userModel.exists(username);
        if(exists){
            return res.status(400).json({err: 'user exists'});
        }
        const hashed = await hash(password);
        await userModel.create(username, hashed);
        res.status(200).json({success: true});
    },

    handleLogin: async (req, res) => {
        const {username, password} = req.body;
        const exists = await userModel.exists(username);
        if(!exists){
            return res.status(400).json({err: 'not matched'});
        }
        const hashed = await userModel.getHash(username);
        const comparison = await compare(password, hashed);
        if(!comparison){
            return res.status(400).json({err: 'not matched'});
        }
        res.status(200).json({success: true})
    },

    getMain: async(req, res) => {

    }
}