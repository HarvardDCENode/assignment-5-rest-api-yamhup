const express = require('express');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//username and passwords are store in .env file
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.koj9l.mongodb.net/cscie31_assignment5?retryWrites=true&w=majority&appName=Cluster0`)
    .catch((err) => {
        console.error(`Database connection error: ${err}`)
        process.exit();
    })

// set up express-session middleware to enable session function for express-flash messages in trips.js file
app.use(session({
    secret: 'cscie31-assignment5',
    resave:true,
    saveUninitialized: true
  }));
app.use(express.urlencoded({extended: true}));
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=> {
    res.end("root requested!")
})

app.use((err, req, res, next) => {
    if (err.status == 404){
        res.status(404).send(`Cannot find ${req.url}`)
    }
})

module.exports = app
