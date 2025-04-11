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

const TripService = imageController.TripImageService;


//read
//http://localhost:8086/api/trips
router.get('/', async(req, res, next)=>{
    console.log('-----------In apiRouter--------------')
    try{
        const trips = await TripService.list()
        console.log(`API: List of trip contents and trip images ${trips}`)
        res.status(200);
        res.json(trips)
    } catch (err){
        console.error(`Error in retrieving trips from MongoDB, ${err}`)
        res.status(404);
        res.end();
    }
})

//read a single trip

//create a single trip

//update a single trip

//delete a single trip

//error handling
router.use(function(err, req, res, next){
    console.error(err);
    res.status(500);
    res.end();
});

module.exports = router;