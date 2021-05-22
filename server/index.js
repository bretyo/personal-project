require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session')

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env;

//controllers
const authCtrl = require('./controllers/authController')

// App instance
const app = express();

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
    app.listen(SERVER_PORT,()=>console.log(`Server listening on port ${SERVER_PORT}`))
})
.catch(err=>console.log(err))

// --------------------ENDPOINTS---------------------

// AUTH
app.post('/auth/register', authCtrl.register)
app.post('/auth/login',authCtrl.login)
// app.get('/auth/me', authCtrl.getUser)  -- potentially don't need this one. if logged in still, i'll still have that info.
app.put('/auth/change_pwd', authCtrl.changePassword)
app.delete('/auth/logout', authCtrl.logout)
app.delete('/auth/delete', authCtrl.deleteUser)