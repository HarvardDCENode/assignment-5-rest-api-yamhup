const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageController = require('../../controllers/imageController');
const flash = require('express-flash');
const Trip = require('../../models/tripModels');
const upload = multer({
  storage: imageController.storage,
  fileFilter: imageController.imageFilter
});

const TripService = imageController.TripService;


//read all trips (http://localhost:8086/api/trips)
router.get('/', async(req, res, next)=>{
    console.log('-----------In apiRouter--------------');
    try{
        const trips = await TripService.list()
        console.log(`API: List of trip contents and trip images ${trips}`);
        res.status(200);
        res.json(trips);
    } catch (err){
        console.error(`Error in retrieving trips from MongoDB, ${err}`);
        res.status(404);
        res.end();
    }
})

//read a single trip

//create a single trip
router.post('/', upload.single('image'),async(req, res, next) => {
    const path ='/static/images/' + req.file.filename
    const tripData = {
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    filename: req.file.filename,
    imageurl: path,
    //convert file size into KB
    size: req.file.size / 1024 |0, 
    username: req.body.username,
    title: req.body.title,
    country: req.body.country,
    city: req.body.city,
    content: req.body.content
    }

    try {
        const trip = await TripService.create(tripData);
        
        console.log('-----Create a trip json format-------')
        res.json(trip);
    } catch (err){
        console.error(`Error in saving a new trip itinerary: ${err}`);
        res.status(500);
        res.end();
    }
    
});
//update a single trip

//delete a single trip

//error handling
router.use(function(err, req, res, next){
    console.error(err);
    res.status(500);
    res.end();
});

module.exports = router;