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
    } catch(err){
        console.error(`Error in retrieving trips from MongoDB, ${err}`);
        //display error message in Postman Body using 
        //res.status(500).json({ error: 'message' }) - from https://expressjs.com/en/api.html#res.json
        res.status(500).json({
            error: 'Error in retrieving trips from MongoDB'
        });
    }
})

//read a single trip
router.get('/:id', async(req, res, next) => {
    console.log(`trip id: ${req.params.id}`)
    try {
        const trip = await TripService.read(req.params.id)
        res.status(200);
        res.json(trip);
    } catch(err){
        console.log(`Error in finding the trip ${req.params.id} from MongoDB, ${err}`)
        res.status(404).json({
            error:'Error in finding the trip.'
        });
        
    }

})


// create a trip with the file upload
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
    } catch(err){
        console.error(`Error in saving a new trip itinerary: ${err}`);
        res.status(500).json({
            error: 'Error in creating a new trip itinerary to MongoDB.'
        });
        
    }
});


//updated one specific trip itinerary  with the file upload
router.put('/:id', upload.single('image'), async(req, res, next) => {
    const trip_id = req.params.id;
    

    // this req.body only includes text, not including the upload image file
    let tripData = req.body;

    // if the user uploaded a new image, update the image file into the tripData object
    if(req.file){
        tripData.originalname = req.file.originalname;
        tripData.mimetype = req.file.mimetype;
        tripData.filename = req.file.filename;
        tripData.imageurl = '/static/images/' + req.file.filename;
        tripData.size = req.file.size / 1024 |0;
    }

    try{
        const trip = await TripService.update(trip_id, tripData);
        res.status(200);
        res.json(trip)
    } catch(err){
        console.error(`Error in updating a trip ${err} `)
        res.status(500).json({
            error: 'Error in updating a trip to MongoDB.'
        });
    }

})


//delete a single trip
router.delete('/:id', async(req, res, next) =>{
    let id = req.params.id;
    try {
        const trip = await TripService.delete(id)
        res.status(200);
        res.json(trip);
    } catch (err){
        res.status(404).json({
            error: `Error in deleting the trip id ${id}`
        });
    }
})


//error handling
router.use(function(err, req, res, next){
    console.error(err);
    res.status(500);
    res.end();
});

module.exports = router;