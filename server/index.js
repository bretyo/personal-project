require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session')
const fetch = require('node-fetch');




const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT, UNSPLASH_KEY} = process.env;


//controllers
const authCtrl = require('./controllers/authController')
const gamesCtrl = require('./controllers/gameController')
const statCtrl = require('./controllers/statController')
const promptCtrl = require('./controllers/promptController')

// MiddleWare
const statMiddleware = require('./middleware/statMiddleware');

// App instance
const app = express();

// Socket instance


// Top level middleware
app.use(express.json());
app.use(
    session({
        secret: SESSION_SECRET,
        resave:false,
        saveUninitialized: true,
        cookie:{maxAge: 1000 * 60 * 60 *24}
    })
)

// Database connection
massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
})
.then(db=>{
    app.set('db', db)
    console.log('DATABASE CONNECTED')
    const io = require('socket.io')(app.listen(SERVER_PORT,()=>console.log(`Server listening on port ${SERVER_PORT}`)),{cors: {origin: true}})
    
    // ----------- SOCKET HANDLERS -----------
    const registerGameHandlers = require("./handlers/gameHandler");
    const registerRoomHandlers = require("./handlers/roomHandler")
    
    const onConnection = (socket) => {
        console.log(`Socket: ${socket.id} connected`)
        registerGameHandlers(io, socket);
        registerRoomHandlers(io,socket);
        socket.on('disconnect', ()=>{
            console.log(`Socket ${socket.id} disconnected` )
        })
    }
    
    io.on("connection", onConnection);
})
.catch(err=>console.log(err))

// --------------------ENDPOINTS---------------------

// AUTH
app.post('/auth/register', authCtrl.register)
app.post('/auth/login',authCtrl.login)
// app.get('/auth/me', authCtrl.getUser)  -- potentially don't need this one. if logged in still, i'll still have that info.
app.put('/auth/change_pwd', authCtrl.changePassword)
app.put('/auth/change_username', authCtrl.changeUsername)
app.delete('/auth/logout', authCtrl.logout)
app.delete('/auth/delete', authCtrl.deleteUser)

// GAMES
app.get('/api/games', gamesCtrl.getGames)
app.put('/api/games/:game_id', gamesCtrl.addPlay, gamesCtrl.getGames)

// PROMPTS
app.get('/api/prompts/:game_id', promptCtrl.getPrompts)

// STATS
app.get('/api/stats', statMiddleware.usersOnly,statCtrl.getStats)
app.get('/api/stats/:game_id', statMiddleware.usersOnly,statCtrl.checkForStat)
app.post('/api/stats/:game_id', statMiddleware.usersOnly, statCtrl.addNewStat)
app.put('/api/stats/:game_id', statMiddleware.usersOnly, statCtrl.updateStat)



