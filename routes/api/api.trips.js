const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageController = require('../../controllers/imageController');
const TripService = imageController.TripService;
const Trip = require('../../models/tripModels');
const upload = multer({
  storage: imageController.storage,
  fileFilter: imageController.imageFilter
});


//read all trips (http://localhost:8086/api/trips)
router.get('/', async(req, res, next)=>{
    try{
        const trips = await TripService.list()
        res.status(200);
        res.json(trips);
    } catch (err){
        console.error(`Error in retrieving trips from MongoDB, ${err}`);
        //display error message in Postman Body
        res.status(500, json({error: 'Error in retrieving trips from MongoDB'}));
    }
})

//read a single trip
router.get('/:id', async(req, res, next) => {
   res.send('ok')
})


// create a  trip with file upload
router.post('/', upload.single('image'), async(req, res, next) => {
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
        res.status(201);
        res.json(trip);
    } catch (err){
        console.error(`Error in saving a new trip itinerary: ${err}`);
        res.status(500).json({error: 'Error in saving a new trip itinerary to MongoDB.'});
        
    }
});


//update a single trip
router.put('/:id', upload.single('image'), async(req, res, next) => {
    const trip_id = req.params.id;
    console.log(`finding id: ${trip_id}`);
    let tripData = req.body;
    try{
        tripData = await TripService.update(trip_id, tripData)
        res.status(200);
        res.json(tripData)
    } catch (err){
        console.error(`Error in updating a trip ${err} `)
        res.status(500).json({error: 'Error in updating a trip to MongoDB.'});
    }

})


//delete a single trip
router.delete('/:id', async(req, res, next) =>{
    res.send('ok')
})


//error handling
router.use(function(err, req, res, next){
    console.error(err);
    res.status(500);
    res.end();
});

module.exports = router;