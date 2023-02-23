const express = require('express');
const http = require('http')
const socketIO = require('socket.io')
const app = express()
const locationRoute = require('./routes/locationRoute')
const cors = require('cors');

//middlewares
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app)
// let io = socketIO(server)
const io = new socketIO.Server(httpServer, {
    cors:{
        origin: '*'
    }
})


app.set('socket', io)
//routes
app.use("/", locationRoute)

io.on('connection', (client) => {
    console.log(`Usuario conectado ${client}`)
    // client.emit("message", 'Conexion exitosa')
});

httpServer.listen(5000, ()=> console.log('Listening'))