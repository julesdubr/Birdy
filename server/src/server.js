const express = require('express');
const app = express()
const session = require("express-session");
const sqlite3 = require('sqlite3').verbose();
const nedb = require('nedb')

// Connexion aux BDs
const sqldb = new sqlite3.Database(':memory');
const mongodb = {};
mongodb.messages = new nedb();
mongodb.messages.loadDatabase();

app.use(express.json());
app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS,HEAD,GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});
app.use(session({
    secret: "technoweb rocks",
    resave: true,
    saveUninitialized: true,
}));

const authRouter = require('./routes/auth')(sqldb)
app.use('/authentification', authRouter)

const userRouter = require('./routes/users')(sqldb)
app.use('/user', userRouter)

// const friendRouter = require('./routes/friends')(sqldb)
// app.use('/user', friendRouter)

const messagesRouter = require('./routes/messages')(mongodb.messages)
app.use('/messages', messagesRouter)

app.on('close', () => sqldb.close());
app.listen(4000, () => console.log(`Server Started`));

exports.default = app;