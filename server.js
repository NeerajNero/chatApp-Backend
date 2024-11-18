require('dotenv').config()
const initializeDatabase = require('./db.connect');
const express = require('express')
const {Server} = require('socket.io')
const http = require('http')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/userRoute')
const checkToken = require('./middleware/checkAuth')
const chatRoutes = require('./routes/chatRoutes')
initializeDatabase()

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://chat-app-frontend-one-ruddy.vercel.app',
        credentials: true
    }
});

app.use(express.json())
app.use(cors({
    origin: 'https://chat-app-frontend-one-ruddy.vercel.app',
    credentials: true
}))
app.use(cookieParser())

app.get('/', (req,res) => {
    res.status(200).json({message: "Hey there Dev"})
})

app.use('/user', userRoute)
app.use('/app', chatRoutes)

io.use(checkToken);

io.on('connection', (socket) => {
    console.log('user connected', socket.userID);
    socket.on('privateMessage', (data) => {
        console.log(data)
        socket.broadcast.emit('privateMessage', {data})
    })
})

server.listen(3000, ()=> {
    console.log("server is running on port: 3000",)
})