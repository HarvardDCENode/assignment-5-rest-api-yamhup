const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageController = require('../controllers/imageController');
const flash = require('express-flash');
const Trip = require('../models/tripModels');
const upload = multer({
  storage: imageController.storage,
  fileFilter: imageController.imageFilter
});

//Initialize flash message
router.use(flash());


router.get('/', (req, res, next)=> {
  console.log("Your are inside trips.ejs");
  Trip.find({})
  .then((trips)=> {
    res.render('trips', {
      trips: trips,
    });
  })
  .catch((err)=>{
    if (err) {
      console.error(`Error in getting all trips details: ${err}`)
      res.end('ERROR!')
    }
  });
})


router.get('/create', (req, res, next) => {
  console.log("Your are inside newItinerary.ejs");
  //array of array (nested array)
  const flashMsgs = [
    // when users forget to upload a file, or trigger a save error, display flash messages back to them
    req.flash('fileUploadError'),
    req.flash('tripItinerarySaveError')
  ]
  res.render('newItinerary',{
    flashMsgs: flashMsgs
  });
})


//open a single trip for editing
router.get('/:tripid',(req, res, next)=>{
  console.log(`finding ${req.params.tripid}`);
  Trip.findOne({
    '_id': req.params.tripid
  })
  .then((trip)=>{
    res.render('updateTrip',{
      trip: trip
    })
  }).catch((err)=> {
    console.error(`Error showing single trip: ${err}`)
  });
})


// updated one specific trip itinerary and redirect users back to see the result
router.post('/:tripid',upload.single('image'), (req, res, next)=> {
  console.log(`Trying to update trip Id: ${req.params.tripid}`)

  Trip.findOne({'_id':req.params.tripid})
  .then((trip)=> {
    var data = {
      username: req.body.username,
      title: req.body.title,
      country: req.body.country,
      city: req.body.city,
      content: req.body.content
    }
    //if the use upload a new images, update properties to data object
    if(req.file) {
      data.imageurl = '/static/images/' + req.file.filename;
      data.mimetype = req.file.mimetype;
      data.filename = req.file.filename;
      data.size = req.file.size / 1024 |0;
    }

    trip.set(data);
    trip.save().then(()=> {
      console.log(res.deletedCount)
      res.redirect('/trips')
    });
  })
  .catch((err)=>{
    console.error(`Posting Update Trip Error: ${err}`)
  });
})


// use deleteOne: Delete a document from a collection
router.post('/delete/:tripid', (req, res, next)=> {
  console.log(`Trying to delete: ${req.params.tripid}`)
  Trip.deleteOne({
    '_id': req.params.tripid
  })
  .then((trip)=> {
    res.redirect('/trips')
  })
  .catch((err)=> {
    console.log(`Error deleting single trip: ${err}`)
  });
})


router.post('/', upload.single('image'),(req, res, next)=> {
  //when the user doesn't upload any file, trigger an error
  if(!req.file) {
    return next( new Error('NoFileUploaded'))
  }
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
  };
  const trip = new Trip(tripData);
  trip.save()
  .then(() => {
    console.log('trip saved:',path);
    res.redirect('/trips');
  })
  .catch((err) => {
    console.error(`Error in saving new trip itinerary: ${err}`);

    // handle async SaveError by passing it to error handler
    /*this error can be triggered if there is a problem connecting mongoDB database, or if user's input didn't pass the validation check, for example: if the user forget to fill any required fields.(In tripModels.js, all the fields are defined required) */
    return next(new Error('TripItinerarySaveError'));
  });
})


//error handler
router.use(function(err, req, res, next){
  console.error(err.stack);
  if (err.message == 'OnlyImageFilesAllowed') {
    req.flash('fileUploadError','Please select an image file with a jpg,jpeg, png, gif, svg or webp filename extension');
    res.redirect('/trips/create');
  } else if (err.message == "NoFileUploaded") {
    req.flash('fileUploadError','You forgot to upload your travel image.');
    res.redirect('/trips/create');
  } else if (err.message == 'TripItinerarySaveError'){
    req.flash('tripItinerarySaveError','There was an error saving your trip itinerary.');
    res.redirect('/trips/create');
  } else {
    next(err);
  };
})


module.exports = router;