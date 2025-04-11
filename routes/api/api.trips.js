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
router.get('/', async(req, res, next)=>{
    console.log('-----------In apiRouter--------------')
    TripImageService.list()
    .then((images) => {
        console.log(`API: List of trip content and tits images: ${images}`)
        res.status(200);
        res.set({'Content-type': 'application/json'})
        res.send(JSON.stringify(images));
    }).catch((err)=>{
        res.status(404);
        res.end();
    })
    console.log('------------')
    
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