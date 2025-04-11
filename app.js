require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const tripRouter = require('./routes/trips')
const apiRouter = require('./routes/api/api.trips')
const imageController = require('./controllers/imageController');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => {
        console.error(`Database connection error: ${err}`)
        process.exit(1);
    })


const app = express();

// set up express-session middleware to enable session function for express-flash messages in trips.js file
app.use(session({
    secret: 'cscie31-assignment5',
    resave:true,
    saveUninitialized: true
  }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=> {
    res.redirect('/trips')
})

app.use('/api/trips', apiRouter);//json 
app.use('/trips', tripRouter);//html 


app.use((req, res, next) => {
    var err = Error(`Resource Not Found ${req.url}`)
    err.status = 404 ;
    next(err);
})

app.use((err, req, res, next) => {
    if (err.status == 404){
        res.status(404).send(`Cannot find ${req.url}`)
    }
})

module.exports = app
