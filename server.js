const app = require('./app');
const {Server} = require('socket.io')
const {createServer} = require('node:http')

const userController = require('./controllers/user');
const sessionController = require('./controllers/sessions');

const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
})

io.on('connection', async(socket) => {

})

module.exports.io = io;
module.exports.server = server;