const path = require('path')
const userModel = require('../models/users')
const cookieParser = require('cookie-parser')
const {hash, compare} = require('./hashing')
const {getToken, getData: verify} = require('./token')

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
        try{
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
            const token = getToken({username: username});
            // res.status(200).json({success: true, token: token})
            res.writeHead(200, {
                'Set-Cookie': `wordLearn=${token}`,
                "Access-Control-Allow-Credentials": "true"
            })
            .send();
        } catch (err){
            console.log(err)
        }
    },

    getMain: async(req, res) => {

    },

    getPage: async(req, res) => {
        const {token} = req.body;
        if(token){
            // handle main page
            return
        }
        console.log(req.cookies)
        res.sendFile(path.join(__dirname, '../public/start/index.html'));
    },

    sendStartStyle: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/start/style.css'));
    },

    sendStartScript: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/start/script.js'))
    }
}