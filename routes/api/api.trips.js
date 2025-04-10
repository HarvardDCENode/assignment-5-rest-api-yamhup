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

const TripImageService = imageController.TripImageService;


//read
router.get('/', (req, res, next)=>{
    TripImageService.list()
    .then((images) => {
        console.log(`API: List of trip images: ${images}`)
        res.status(200);
        res.set({'Content-type': 'application/json'})
        res.send(JSON.stringify(images));
    });
    console.log('Done with get reading the tripImages data')
    
})
//read a single trip

//create a single trip

//update a single trip

//delete a single trip


module.exports = router;